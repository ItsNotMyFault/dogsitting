using dogsitting_backend.ApplicationServices;
using dogsitting_backend.ApplicationServices.dto;
using dogsitting_backend.ApplicationServices.response;
using dogsitting_backend.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace dogsitting_backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TeamController : ControllerBase
    {
        private TeamService teamService;
        private ReservationService ReservationService;
        public TeamController(TeamService teamService, ReservationService reservationService)
        {
            this.teamService = teamService;
            this.ReservationService = reservationService;
        }


        [HttpGet]
        [AllowAnonymous]
        public List<TeamResponse> GetTeams()
        {
            List<TeamResponse> teams = this.teamService.GetTeamsWithAdmins().Result.ToList();
            return teams;
        }

        //todo: move this in applicationUserController
        //user/id/teams
        [HttpGet("user/{UserId}")]
        [AllowAnonymous]
        public ActionResult GetUserTeams([FromRoute] Guid UserId)
        {
            List<Team> teams = this.teamService.GetUserTeams(UserId).Result.ToList();
            string json = JsonConvert.SerializeObject(teams);

            return Ok(json);
        }

        [HttpGet("{teamNormalizedName}")]
        [AllowAnonymous]
        public async Task<Team> GetTeamByNormalizedName([FromRoute] string teamNormalizedName)
        {
            Team team = await this.teamService.GetTeamByNormalizedName(teamNormalizedName);
            return team;
        }



        [HttpGet("id/{id}")]
        public async Task<ActionResult> GetTeamById([FromRoute] Guid id)
        {
            TeamResponse team = await this.teamService.GetTeamById(id);
            string json = JsonConvert.SerializeObject(team);
            return Ok(json);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateTeamDto teamDto)
        {
            await this.teamService.UpdateTeamAsync(id, teamDto);
            return Ok();
        }

        [HttpPost("create")]
        public async Task<ActionResult> Create([FromBody] CreateTeamDto team)
        {
            await this.teamService.CreateTeamAsync(team);

            return Ok(JsonConvert.SerializeObject(team));
        }

        [HttpPost("{team}/reservations")]
        public async Task<ActionResult> CreateTeamReservation([FromRoute] string team, [FromBody] ReservationDto reservation)
        {
            ReservationResponse newReservation = await this.ReservationService.AddReservationToTeamCalendar(reservation, team);

            var settings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            };
            string json = JsonConvert.SerializeObject(newReservation, settings);
            return Ok(json);
        }


        [HttpGet("{Id}/media")]
        public async Task<List<TeamMediaResponse>> GetTeamMedias([FromRoute] Guid Id)
        {
            List<TeamMediaResponse> mediaresponses = await this.teamService.GetTeamMedias(Id);
            if (mediaresponses.Count > 4)
            {
                throw new Exception("Too Many pictures shouldn't happen.");
            }
            return mediaresponses;
        }

        /// <summary>
        /// Update media
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        [HttpPut("{Id}/media")]
        public async Task<ActionResult> UpdateTeamMedia([FromRoute] Guid Id)
        {
            List<IFormFile> files = Request.Form.Files.ToList();

            // Better: Get all position values from the form
            List<int> positions = new List<int>();
            foreach (var positionStr in Request.Form["positions"])
            {
                if (int.TryParse(positionStr, out int position))
                {
                    positions.Add(position);
                }
            }

            if (files.Count > 4)
            {
                return BadRequest("Too many files. Maximum 4 files allowed.");
            }

            if (files.Count != positions.Count)
            {
                return BadRequest("Number of files must match number of positions.");
            }

            var filePositionPairs = files.Zip(positions, (file, position) => (file, position)).ToList();
            await this.teamService.UpdateTeamMedia(Id, filePositionPairs);
            return Ok();
        }
    }
}
