using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Linq;


namespace Vegetation.DAL.library
{
    class PersianName : Attribute
    {
        public string Text;
        public PersianName(string text)
        {
            Text = text;
        }
    }

    [AttributeUsage(AttributeTargets.All, Inherited = true)]
    public class DescriptionAttribute : Attribute
    {
        private readonly string _title;
        public string Title
        {
            get { return _title; }
        }

        public DescriptionAttribute(string title)
        {
            _title = title;
        }
    }

    public static class Extensions
    {
        public static string GetDisplay<T>(this T EnumItem)
        {

            if (typeof(T).IsEnum)
            {

                try
                {
                    return ((PersianName)typeof(T).GetFields().Single(rec => rec.Name == Enum.GetName(typeof(T), EnumItem)).GetCustomAttributes(false).First(rec => rec is PersianName)).Text;
                }
                catch
                {
                    return EnumItem.ToString();
                }
            }

            return EnumItem.ToString();

        }

        public static string GetName<T>(this T EnumItem)
        {

            if (typeof(T).IsEnum)
            {
                try
                {
                    return ((DisplayAttribute)typeof(T).GetMember(Enum.GetName(typeof(T), EnumItem))[0].GetCustomAttributes(typeof(DisplayAttribute), false).First()).Name;
                }
                catch
                {
                    return EnumItem.ToString();
                }
            }

            return EnumItem.ToString();

        }

    }
}
