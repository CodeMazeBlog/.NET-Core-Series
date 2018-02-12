using Contracts;
using Entities;

namespace Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        public IOwnerRepository Owner { get; set; }
        public IAccountRepository Account { get; set; }

        public RepositoryWrapper(RepositoryContext repositoryContext)
        {
            this.Owner = new OwnerRepository(repositoryContext);
            this.Account = new AccountRepository(repositoryContext);
        }
    }
}
