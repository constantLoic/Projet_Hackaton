using DevApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace DevApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjetController : Controller
    {
       private IProjetService ProjetService { get; set; }

        public ProjetController(IProjetService projetService)
        {
            this.ProjetService = projetService;
        }

        /// <summary>
        /// Récupère les projets.
        /// </summary>
        /// <returns>Une liste de projets.</returns>
        /// <response code="200">Retourne la liste des projets</response>
        /// <response code="404">Projets inexistants</response>
        [HttpGet("")]
        [ProducesResponseType(typeof(int[]), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllProjets()
        {
            return Ok(await ProjetService.GetAll());
        }

        /// <summary>
        /// Crée un nouveau projet
        /// </summary>
        /// <param name="name">Le nom du projet</param>
        /// <param name="description">La description du projet</param>
        /// <response code="200">Projet créé</response>
        /// <response code="404">Problème lors de la création</response>
        [HttpPost("")]
        public async Task<IActionResult> AddProjet(string name, string description)
        {
            await ProjetService.Add(name, description);
            return Ok();
        }
    }
}
