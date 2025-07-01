using DevApi.Services;
using DevApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace DevApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TacheController : Controller
    {
        private ITacheService TacheService { get; set; }

        public TacheController(ITacheService tacheService)
        {
            this.TacheService = tacheService;
        }

        /// <summary>
        /// Récupère les taches.
        /// </summary>
        /// <returns>Une liste de taches.</returns>
        /// <response code="200">Retourne la liste des taches</response>
        /// <response code="404">Taches inexistantes</response>
        [HttpGet("")]
        [ProducesResponseType(typeof(int[]), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllTaches()
        {
            return Ok(await TacheService.GetAll());
        }

        /// <summary>
        /// Crée une nouvelle tache
        /// </summary>
        /// <param name="name">Le nom de la tache</param>
        /// <param name="description">La description de la tache</param>
        /// <param name="date">La deadline de la tache</param>
        /// <param name="projetId">Le projet auquel appartient la tache</param>
        /// <response code="200">Tache créée</response>
        /// <response code="404">Problème lors de la création</response>
        [HttpPost("")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> AddTache(string name, string description, string date, int projetId)
        {
            await TacheService.Add(name, description, date, projetId);
            return Ok();
        }

        /// <summary>
        /// Supprime une tache par son identifiant.
        /// </summary>
        /// <param name="id">L'identifiant de la tache à supprimer.</param>
        /// <returns>Une réponse indiquant le succès ou l'échec de la suppression.</returns>
        /// <response code="204">Tache supprimée avec succès</response>
        /// <response code="404">Tache introuvable</response>
        [HttpDelete("id")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> RemoveTache(int id)
        {
            await TacheService.Remove(id);
            return Ok();
        }

        /// <summary>
        /// Met à jour le statut d'un projet.
        /// </summary>
        /// <param name="id">L'identifiant du projet à mettre à jour.</param>
        /// <returns>Une réponse indiquant le succès ou l'échec de la mise à jour.</returns>
        /// <response code="200">Statut mis à jour avec succès</response>
        /// <response code="404">Tache introuvable</response>
        [HttpPost("id/status")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ModifierStatutProjet(int id)
        {
            await TacheService.ChangeStatus(id);
            return Ok();
        }
    }
}
