﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDWebAPI.Application.DTO.DTO;
using DDDWebAPI.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebApiDDD.Presentation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {

        private readonly IApplicationServiceCliente _applicationServiceCliente;


        public ClientesController(IApplicationServiceCliente ApplicationServiceCliente)
        {
            _applicationServiceCliente = ApplicationServiceCliente;
        }
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return Ok(_applicationServiceCliente.GetAll());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            var client = _applicationServiceCliente.GetById(id);
            return Ok(client);
        }

        // POST api/values
        [HttpPost]
        public ActionResult Post([FromBody] ClienteDTO clienteDTO)
        {
            try
            {
                if (clienteDTO == null)
                    return NotFound();

                _applicationServiceCliente.Add(clienteDTO);
                return Ok("Cliente Cadastrado com sucesso!");
            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        // PUT api/values/5
        [HttpPut]
        public ActionResult Put([FromBody] ClienteDTO clienteDTO)
        {
            try
            {
                if (clienteDTO == null)
                    return NotFound();

                _applicationServiceCliente.Update(clienteDTO);
                return Ok("Cliente Atualizado com sucesso!");
            }
            catch (Exception)
            {

                throw;
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var cliente = _applicationServiceCliente.GetById(id);

            try
            {
                if (cliente == null)
                    return NotFound();

                _applicationServiceCliente.Remove(cliente);
                return Ok("Cliente Removido com sucesso!");
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}