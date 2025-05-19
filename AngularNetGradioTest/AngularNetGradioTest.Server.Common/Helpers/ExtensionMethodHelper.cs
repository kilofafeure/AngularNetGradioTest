using System.ComponentModel;
using System.Reflection;

namespace AngularNetGradioTest.Server.Common.Helpers
{
    public static partial class ExtensionMethodHelper
    {
        public static string GetEnumDescription(Enum? value)
        {
                if (value is null)
                    return string.Empty;

                var field = value.GetType().GetField(value.ToString());

                if (field is null)
                    return string.Empty;

                DescriptionAttribute[] attributes = (DescriptionAttribute[])field.GetCustomAttributes(typeof(DescriptionAttribute), false);
                return attributes.Length > 0 ? attributes[0].Description : value.ToString();
        }

        public static int? GetEnumByDescription<TEnum>(string description) where TEnum : Enum
        {
            if (string.IsNullOrWhiteSpace(description))
                return null;

            foreach (var field in typeof(TEnum).GetFields())
            {
                var attribute = field.GetCustomAttribute<DescriptionAttribute>();
                if (attribute is not null && attribute.Description == description)
                {
                    // Don't change (int) by (int?)
                    // Will obtain error: Unable to cast object of type 'EsSimsIsabelII.Common.Enums.Orange.OrangeRequestStatusValueEnum' to type 'System.Nullable`1[System.Int32]'.
                    return (int)field.GetValue(null);
                }
            }
            return null;
        }
    }
}
