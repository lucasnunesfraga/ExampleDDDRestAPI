using Autofac;
using DDDWebAPI.Application.Interfaces;
using DDDWebAPI.Application.Service;
using DDDWebAPI.Domain.Core.Interfaces.Repositorys;
using DDDWebAPI.Domain.Core.Interfaces.Services;
using DDDWebAPI.Domain.Services.Services;
using DDDWebAPI.Infrastructure.CrossCutting.Adapter.Interfaces;
using DDDWebAPI.Infrastructure.CrossCutting.Adapter.Map;
using DDDWebAPI.Infrastructure.Repository.Repositorys;

namespace DDDWebAPI.Infrastructure.CrossCutting.IOC
{
    public class ConfigurationIOC
    {
        public static void Load(ContainerBuilder builder)
        {
            #region Registra IOC

            #region IOC Application
            builder.RegisterType<ApplicationServiceCliente>().As<IApplicationServiceCliente>();
            #endregion

            #region IOC Services
            builder.RegisterType<ServiceCliente>().As<IServiceCliente>();
            #endregion

            #region IOC Repositorys SQL
            builder.RegisterType<RepositoryCliente>().As<IRepositoryCliente>();
            #endregion

            #region IOC Mapper
            builder.RegisterType<MapperCliente>().As<IMapperCliente>();
            #endregion

            #endregion

        }
    }
}