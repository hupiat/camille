using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace camille.Models
{
    public static class TablesMapping
    {
        // Format : ETables.FOO_TEST = "FooTest"
        public static string GetTableName(this ETables t)
        {
            StringBuilder nameBuilder = new StringBuilder();
            string[] strsArray = t.ToString().Split("_");

            foreach (string str in strsArray)
            {
                char[] chars = str.ToLower().ToCharArray();
                chars[0] = chars[0].ToString().ToUpper().ToCharArray()[0];
                nameBuilder.Append(new string(chars));
            }

            return nameBuilder.ToString();
        }
    }

    public enum ETables
    {
        PATTERN,
        PATTERN_ELEMENT,
        PATTERN_ELEMENT_BOND,
        PATTERN_TAG,
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
