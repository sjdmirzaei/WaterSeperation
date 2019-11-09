using System;
using System.Collections.Generic;
using org.mariuszgromada.math.mxparser;

namespace Vegetation.Domain.Services.Formula
{
    public class FormulaService : IService
    {
         public UnitOfWork unitOfWork { get; set; }

        public FormulaService(UnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
        }

        public double Execute(string name, IDictionary<string, object> parametresvalue)
        {
            var formula = this.unitOfWork.FromulaRepo.SingleOrDefault(rec => rec.Name == name);

            if (formula == null)
                throw new Exception();

            try
            {                
                Argument[] param = new Argument[parametresvalue.Count];

                int i = 0;

                foreach (var item in parametresvalue)
                    try { param[i++] = new Argument(item.Key + " = " + item.Value.ToString()); } catch { }

                Expression eh = new Expression(formula.Content, param);

                var result = eh.calculate();


                Function At = new Function("At(b,h) =1/2 * b + h");
                Expression e1 = new Expression("At(2,4)", At);
                var t = e1.calculate();

                Argument b = new Argument("b = 2");
                Argument h = new Argument("h = 4");
                Expression e2 = new Expression("At(b,h) + b", At, h, b);
                var d = e2.calculate();

                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }

            throw new Exception();
        }
    }
}