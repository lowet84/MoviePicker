using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net.Http;
using System.Text;
using Microsoft.AspNet.Mvc;
using MoviePicker.Model;
using MoviePicker.Utility;

namespace MoviePicker.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<JackettResultGroup> Get()
        {
            var ret = JackettHelper.Query(string.Empty);
            return ret.Take(10);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IEnumerable<JackettResultGroup> Get(string id)
        {
            var ret = JackettHelper.Query(id);
            return ret;
        }

        // POST api/values
        [HttpPost]
        public bool Post([FromBody]PostData data)
        {
            return DelugeHelper.Download(data.Link, data.Pass);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        public class PostData
        {
            public string Link { get; set; }
            public string Pass { get; set; }
        }
    }
}
