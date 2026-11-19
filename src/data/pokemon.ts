/** Conteúdo demonstrativo para prototipação de UI. NÃO é integração com PokéAPI. */
export type PokemonType = 'grass' | 'poison' | 'fire' | 'water' | 'electric' | 'normal' | 'flying' | 'bug' | 'psychic' | 'fairy' | 'ground' | 'rock' | 'fighting' | 'ghost' | 'ice' | 'dragon';
export type Pokemon = {
  id: number; name: string; types: PokemonType[]; height: number; weight: number;
  description: string; habitat: string; stats: [number,number,number,number,number,number];
};
export const typeLabels: Record<PokemonType,string> = {grass:'Planta',poison:'Veneno',fire:'Fogo',water:'Água',electric:'Elétrico',normal:'Normal',flying:'Voador',bug:'Inseto',psychic:'Psíquico',fairy:'Fada',ground:'Terra',rock:'Pedra',fighting:'Lutador',ghost:'Fantasma',ice:'Gelo',dragon:'Dragão'};
export const typeColors: Record<PokemonType,string> = {grass:'#4DAB70',poison:'#9665B8',fire:'#F17A50',water:'#4B97D5',electric:'#E8AE31',normal:'#8D97A3',flying:'#7C9DDD',bug:'#8FAF44',psychic:'#E46C9A',fairy:'#DB8CC6',ground:'#B58D5B',rock:'#AD9273',fighting:'#C87751',ghost:'#8264A8',ice:'#6ABBC8',dragon:'#6D73BE'};
const sample = (id:number,name:string,types:PokemonType[],stats:[number,number,number,number,number,number],height:number,weight:number,description:string,habitat:string):Pokemon => ({id,name,types,stats,height,weight,description,habitat});
export const samplePokemon: Pokemon[] = [
  sample(1,'Bulbasaur',['grass','poison'],[45,49,49,65,65,45],.7,6.9,'Desde o nascimento, uma semente cresce em suas costas e absorve a luz do sol.','Campos e florestas'),
  sample(2,'Ivysaur',['grass','poison'],[60,62,63,80,80,60],1,13,'O botão em suas costas se desenvolve enquanto absorve energia solar.','Campos e florestas'),
  sample(3,'Venusaur',['grass','poison'],[80,82,83,100,100,80],2,100,'A flor em suas costas libera um aroma agradável após dias ensolarados.','Florestas e pradarias'),
  sample(4,'Charmander',['fire'],[39,52,43,60,50,65],.6,8.5,'A chama na ponta de sua cauda indica sua vitalidade.','Montanhas e regiões quentes'),
  sample(5,'Charmeleon',['fire'],[58,64,58,80,65,80],1.1,19,'Possui um temperamento intenso e garras afiadas.','Montanhas e regiões quentes'),
  sample(6,'Charizard',['fire','flying'],[78,84,78,109,85,100],1.7,90.5,'Voa pelos céus em busca de oponentes fortes.','Montanhas'),
  sample(7,'Squirtle',['water'],[44,48,65,50,64,43],.5,9,'Seu casco ajuda na proteção e na movimentação dentro da água.','Lagos e rios'),
  sample(8,'Wartortle',['water'],[59,63,80,65,80,58],1,22.5,'Sua longa cauda é símbolo de longevidade.','Lagos e rios'),
  sample(9,'Blastoise',['water'],[79,83,100,85,105,78],1.6,85.5,'Canhões de água poderosos ficam alojados em seu casco.','Lagos e rios'),
  sample(10,'Caterpie',['bug'],[45,30,35,20,20,45],.3,2.9,'Tem um olfato apurado e se alimenta de folhas.','Bosques'),
  sample(12,'Butterfree',['bug','flying'],[60,45,50,90,80,70],1.1,32,'Suas asas coloridas ajudam a espalhar pólen pelas flores.','Pradarias'),
  sample(16,'Pidgey',['normal','flying'],[40,45,40,35,35,56],.3,1.8,'Costuma viver em florestas e campos.','Bosques e campos'),
  sample(25,'Pikachu',['electric'],[35,55,40,50,50,90],.4,6,'Armazena eletricidade nas bochechas e libera descargas quando se sente ameaçado.','Florestas e campos'),
  sample(37,'Vulpix',['fire'],[38,41,40,50,65,65],.6,9.9,'Sua pelagem é quente e suas caudas se multiplicam com o crescimento.','Campos e montanhas'),
  sample(39,'Jigglypuff',['normal','fairy'],[115,45,20,45,25,20],.5,5.5,'Seu canto melodioso pode fazer até os mais agitados adormecerem.','Pradarias'),
  sample(43,'Oddish',['grass','poison'],[45,50,55,75,65,30],.5,5.4,'Durante o dia, costuma se esconder sob o solo.','Florestas'),
  sample(52,'Meowth',['normal'],[40,45,35,40,40,90],.4,4.2,'É atraído por objetos brilhantes e gosta de passear à noite.','Cidades'),
  sample(54,'Psyduck',['water'],[50,52,48,65,50,55],.8,19.6,'Seus poderes misteriosos aparecem quando sua dor de cabeça se intensifica.','Lagos e rios'),
  sample(58,'Growlithe',['fire'],[55,70,45,70,50,60],.7,19,'Conhecido por seu companheirismo e excelente olfato.','Pradarias'),
  sample(63,'Abra',['psychic'],[25,20,15,105,55,90],.9,19.5,'Passa muitas horas dormindo e utiliza teletransporte para se proteger.','Cidades e campos'),
  sample(74,'Geodude',['rock','ground'],[40,80,100,30,30,20],.4,20,'É frequentemente confundido com uma pedra de trilha.','Montanhas e cavernas'),
  sample(92,'Gastly',['ghost','poison'],[30,35,30,100,35,80],1.3,.1,'Seu corpo é formado por uma nuvem de gás.','Cavernas'),
  sample(133,'Eevee',['normal'],[55,55,50,45,65,55],.3,6.5,'Sua estrutura genética permite diferentes evoluções.','Cidades e campos'),
  sample(147,'Dratini',['dragon'],[41,64,45,50,50,50],1.8,3.3,'Esse Pokémon raro cresce mudando de pele repetidamente.','Lagos e rios'),
];
export function artworkUrl(id:number) { return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`; }
