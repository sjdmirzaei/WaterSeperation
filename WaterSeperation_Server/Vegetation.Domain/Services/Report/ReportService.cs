using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Vegetation.Domain.Services.Report
{
    public class ReportService
    {
        public UnitOfWork UnitOfWork { get; set; }
        public IConfiguration Configuration { get; }

        public ReportService(UnitOfWork unitOfWork, IConfiguration configuration)
        {
            this.UnitOfWork = unitOfWork;
            Configuration = configuration;
        }

        public DataTable Execute(string query, List<Parameter> parameters)
        {
            string connectionString = Configuration.GetConnectionString("DefaultConnection");
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.CommandTimeout = 0;
                        if (parameters != null && parameters.Count > 0)
                            foreach (Parameter param in parameters)
                            {
                                DbParameter dbParameter = command.CreateParameter();
                                dbParameter.ParameterName = param.Key;
                                if (param != null)
                                    if (param.Value != null && (param.Value != null && (param.Value.GetType() != typeof(string) || (param.Value.GetType() == typeof(string)) && !string.IsNullOrWhiteSpace((string)param.Value))))
                                        dbParameter.Value = param.Value;
                                    else
                                        dbParameter.Value = DBNull.Value;
                                else
                                    dbParameter.Value = DBNull.Value;
                                command.Parameters.Add(dbParameter);
                            }


                        DataTable datatable = new DataTable();
                        connection.Open();

                        SqlDataAdapter sda = new SqlDataAdapter(command);

                        sda.Fill(datatable);

                        connection.Close();

                        return datatable;

                    }
                }
                catch (SqlException exception)
                {
                    connection.Close();
                    throw exception;
                }
                finally
                {
                    connection.Close();
                    connection.Dispose();
                }
            }

        }

    }

}