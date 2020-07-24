import showHomePage from './ui/battle-royale/home-page.js';
import showStats from './ui/battle-royale/stats.js';

showHomePage('es-419')

function showMain(){
    $('#stats-header').addClass('d-none');
    $('#stats-section').addClass('d-none');
    $('#main-header').removeClass('d-none');
    $('#main-section').removeClass('d-none');
}

$("#search-stats-form").on('submit', function(e){
    e.preventDefault();  
    showStats($('#search-stats-form input').val());
 });
$('#back-main-button').click(showMain);