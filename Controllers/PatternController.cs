using System;
using System.Collections.Generic;
using camille.DAL;
using camille.DTO;
using camille.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace camille.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PatternController : ControllerBase
    {
        private readonly PatternRepository _repository;

        public PatternController(PatternContext context) => _repository = new PatternRepository(context);

        [HttpGet]
        public IEnumerable<PatternDTO> Get() => PatternMapper.Map(
            _repository.FetchAllPatterns(),
            _repository.FetchAllPatternElements(),
            _repository.FetchAllTags()
        );
    }
}
