using System;

namespace Services.Utilities
{
    public class HiScoreRetrievalException : Exception
    {
        public HiScoreRetrievalException() : base()
        {
        }

        public HiScoreRetrievalException(string message) : base(message)
        {
        }

        public HiScoreRetrievalException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
