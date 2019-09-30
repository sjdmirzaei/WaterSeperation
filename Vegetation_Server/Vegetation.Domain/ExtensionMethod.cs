using System;
using System.Globalization;

namespace Vegetation.Domain
{
    public static class ExtensionMethod
    {
        public static string ToPesianDateString(this DateTime date, string format = "yyyy/MM/dd")
        {
            PersianCalendar pc = new PersianCalendar();
            string month = pc.GetMonth(date).ToString();
            if (month.Length == 1)
                month = "0" + month;

            string day = pc.GetDayOfMonth(date).ToString();
            if (day.Length == 1)
                day = "0" + day;

            return string.Format("{0}/{1}/{2}", pc.GetYear(date), month, day);

        }

        public static DateTime ToGregorianDateString(this string date)
        {
            string[] listDate = date.Split('/');
            int year, month, day;
            if (listDate[0].Length == 4)
            {
                string y = listDate[0].ToString();
                year = int.Parse(y);
                month = int.Parse(listDate[1].ToString(CultureInfo.InvariantCulture));
                day = int.Parse(listDate[2].ToString(CultureInfo.InvariantCulture));
            }
            else
            {
                year = int.Parse(listDate[2]);
                month = int.Parse(listDate[0]);
                day = int.Parse(listDate[1]);
            }
            PersianCalendar pc = new PersianCalendar();
            DateTime dt = new DateTime(year, month, day, pc);
            return DateTime.Parse(dt.ToString());
        }
    }

}
