using Entities.Models;
using System;
using System.Collections.Generic;

namespace Contracts
{
    public interface IAccountRepository
    {
        IEnumerable<Account> AccountsByOwner(Guid ownerId);
    }
}
