using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Contracts;
using Entities;
using Entities.Enumerations;
using Entities.Models;

namespace AccountOwnerServer.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repoWrapper;

        public ValuesController(ILoggerManager logger, IRepositoryWrapper repoWrapper)
        {
            _logger = logger;
            _repoWrapper = repoWrapper;
        }
        // GET api/values
        [HttpGet]
        public Tuple<IEnumerable<Account>, IEnumerable<Owner>> Get()
        {
            var domesticAccounts = _repoWrapper.Account.FindByCondition(x => x.AccountType.Equals("Domestic"));
            var owners = _repoWrapper.Owner.FindAll();

            _logger.LogInfo("Here is info message from our values controller.");
            _logger.LogDebug("Here is debug message from our values controller.");
            _logger.LogWarn("Here is warn message from our values controller.");
            _logger.LogError("Here is error message from our values controller.");

            return new Tuple<IEnumerable<Account>, IEnumerable<Owner>>(domesticAccounts, owners);
        }
    }
}
