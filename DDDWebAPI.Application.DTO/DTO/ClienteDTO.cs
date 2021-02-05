using System;

namespace DDDWebAPI.Application.DTO.DTO
{
    public class ClienteDTO
    {
        public int? Id { get; set; }

        public string Nome { get; set; }

        public string Sobrenome { get; set; }

        public string Email { get; set; }
        public DateTime DataCadastro { get; set; }
        public bool Ativo { get; set; }
    }
}
