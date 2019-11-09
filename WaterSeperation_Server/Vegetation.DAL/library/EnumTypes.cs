using System;
using System.Collections.Generic;
using System.Text;

namespace Vegetation.DAL.library
{
    public enum ParameterType
    {
        [PersianName("جعبه متنی")]
        Text = 1,

        [PersianName("جعبه متن عددی")]
        Number = 2,

        [PersianName("جعبه تاریخ")]
        Date = 3,

        [PersianName("ساعت")]
        Time = 4,

        [PersianName("چک باکس")]
        Check = 5,

        [PersianName("لیست کشویی ایستا")]
        StaticList = 6,

        [PersianName("لیست کشویی پویا")]
        DynamicList = 7,
    }

}
