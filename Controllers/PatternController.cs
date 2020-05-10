using System;
using System.Collections.Generic;
using camille.Controls;
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
    public IEnumerable<PatternDTO> Get() => PatternMapper.AsPatternsDTOEnumerable(
        _repository.FetchAllPatterns(),
        _repository.FetchAllPatternElements(),
        _repository.FetchAllTags());

    [HttpGet("tags")]
    public IEnumerable<TagDTO> GetTags() => PatternMapper.AsTagDTOCollection(_repository.FetchAllTags());

    [HttpPost]
    public PatternDTO Insert(PatternDTO patternDTO) => ApplyThenReturnPattern(patternDTO, _repository.Insert);

    [HttpPut]
    public PatternDTO Update(PatternDTO patternDTO) => ApplyThenReturnPattern(patternDTO, _repository.Update);

    [HttpDelete]
    public void Remove(int id) => _repository.RemovePattern(id);

    private PatternDTO ApplyThenReturnPattern(PatternDTO patternDTO, Action<Pattern> action)
    {
      try
      {
        PatternControls.Check(patternDTO);
      }
      catch (ArgumentException e)
      {
        Response.StatusCode = 403;
        throw e;
      }

      Pattern pattern = PatternMapper.AsPattern(patternDTO,
          _repository.FetchAllVectors(),
          _repository.FetchAllBonds(),
          _repository.FetchAllPatternTags());

      action.Invoke(pattern);

      return PatternMapper.AsPatternDTO(pattern,
          _repository.FetchAllPatternElements(),
          _repository.FetchAllTags());
    }
  }
}
