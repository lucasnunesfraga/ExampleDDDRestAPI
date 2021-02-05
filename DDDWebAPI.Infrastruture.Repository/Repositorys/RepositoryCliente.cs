using DDDWebAPI.Domain.Core.Interfaces.Repositorys;
using DDDWebAPI.Domain.Models;
using DDDWebAPI.Infrastructure.Data;

namespace DDDWebAPI.Infrastructure.Repository.Repositorys
{
    public class RepositoryCliente : RepositoryBase<Cliente>, IRepositoryCliente
    {
        public readonly SqlContext _context;
        public RepositoryCliente(SqlContext Context)
            : base(Context)
        {
            _context = Context;
        }
    }
}