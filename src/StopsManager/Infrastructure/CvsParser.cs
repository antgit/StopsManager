using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace StopsManager.Infrastructure
{
    public class CvsParser
    {
        public string[][] Parse(string filePath)
        {
            var allLines = File.ReadAllLines(filePath).Skip(1).ToArray();
            return allLines.Select(line => line.Split(',')).ToArray();
        }
    }
}
