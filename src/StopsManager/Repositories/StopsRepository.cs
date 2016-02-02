using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.Extensions.PlatformAbstractions;
using StopsManager.Infrastructure;
using StopsManager.Models;

namespace StopsManager.Repositories
{
    public class StopsRepository
    {
        private readonly IApplicationEnvironment _applicationEnvironment;
        private readonly CvsParser _cvsParser;

        public StopsRepository(IApplicationEnvironment applicationEnvironment, CvsParser cvsParser)
        {
            if (applicationEnvironment == null) throw new ArgumentNullException(nameof(applicationEnvironment));
            if (cvsParser == null) throw new ArgumentNullException(nameof(cvsParser));

            _applicationEnvironment = applicationEnvironment;
            _cvsParser = cvsParser;
        }

        public List<StopModel> GetAll()
        {
            //TODO move file name to project settings
            var filePath = Path.Combine(_applicationEnvironment.ApplicationBasePath, "App_Data", "stops.txt");
            var stopsData = _cvsParser.Parse(filePath);

            return stopsData.Select(s => new StopModel
            {
                Id = int.Parse(s[0]),
                Name = s[1],
                Description = s[2],
                Latitude = float.Parse(s[3]),
                Longitude = float.Parse(s[4]),
                ZoneId = s[5],
                Url = s[6],
                LocationType = s[7],
                ParentStation = s[8]
            }).ToList();
        }
    }
}
