const fs = require('fs');

const filepath = '/Users/admin/PROJETS_CLAUDE/app-suppleance/jeux-suppleance.js';
let content = fs.readFileSync(filepath, 'utf8');

// Find the cycle3 jeux array boundaries
const cycle3_pos = content.indexOf('cycle3: {');
const jeux_marker = '    jeux: [\n';
const jeux_start = content.indexOf(jeux_marker, cycle3_pos);
const array_content_start = jeux_start + jeux_marker.length;
const closing_bracket = content.indexOf('\n    ]\n', array_content_start);

const old_games = content.substring(array_content_start, closing_bracket);
console.log(`Found ${old_games.split('\n').length} lines of old games to replace`);

// Read the new games from the Python script
const pyContent = fs.readFileSync('/Users/admin/PROJETS_CLAUDE/app-suppleance/replace_cycle3.py', 'utf8');
const newGamesMatch = pyContent.match(/new_games = r"""([\s\S]*?)"""/);
if (!newGamesMatch) {
  console.error('Could not find new_games in Python script');
  process.exit(1);
}
const new_games = newGamesMatch[1];

const content_new = content.substring(0, array_content_start) + new_games + '\n' + content.substring(closing_bracket);

fs.writeFileSync(filepath, content_new, 'utf8');

// Verify
const verifyContent = fs.readFileSync(filepath, 'utf8');
const cycle3Section = verifyContent.substring(verifyContent.indexOf('cycle3:'));
const cycle3Games = cycle3Section.substring(0, cycle3Section.indexOf(']'));
const gameCount = (cycle3Games.match(/\{cat:/g) || []).length;
console.log(`Cycle3 now has ${gameCount} games`);
console.log('File updated successfully!');
