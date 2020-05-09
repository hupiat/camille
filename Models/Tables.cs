using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace camille.Models
{
    public static class TablesMapping
    {
        // Format : ETables.FOO_TEST = "FooTest"
        public static string GetTableName(this ETables t)
        {
            string tableName = "";
            string[] strsArray = t.ToString().Split("_");

            foreach (string str in strsArray)
            {
                char[] chars = str.ToLower().ToCharArray();
                chars[0] = chars[0].ToString().ToUpper().ToCharArray()[0];
                tableName += new string(chars);
            }

            return tableName;
        }
    }

    public enum ETables
    {
        PATTERN,
        PATTERN_ELEMENT,
        PATTERN_ELEMENT_BOND,
        PATTERN_TAG,
        SIZE,
        TAG,
        VECTOR
    }

    public class Tables : TableAttribute
    {

        protected Tables(string name) : base(name)
        {
        }

        public Tables(ETables table) : base(table.GetTableName())
        {
        }
    }

    public class TablesForeignKey : ForeignKeyAttribute
    {
        protected TablesForeignKey(string name) : base(name)
        {
        }

        public TablesForeignKey(ETables table) : base(table.GetTableName())
        {
        }
    }
}
