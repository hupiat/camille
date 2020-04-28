using System;
using System.Collections.Generic;
using camille.DAL;
using camille.DTO;
using camille.Mappers;
using camille.Models;
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

        [HttpPost]
        public PatternDTO Insert(PatternDTO patternDTO) => ApplyThenReturnPattern(patternDTO, _repository.Insert);

        [HttpPut]
        public PatternDTO Update(PatternDTO patternDTO) => ApplyThenReturnPattern(patternDTO, _repository.Update);

        [HttpDelete]
        public void Delete(int id) => _repository.RemovePattern(id);

        private PatternDTO ApplyThenReturnPattern(PatternDTO patternDTO, Action<Pattern> action)
        {
            Pattern pattern = PatternMapper.Map(patternDTO);
            action.Invoke(pattern);
            return PatternMapper.Map(pattern,
                _repository.FetchAllPatternElements(),
                _repository.FetchAllTags());
        }
    }
}
