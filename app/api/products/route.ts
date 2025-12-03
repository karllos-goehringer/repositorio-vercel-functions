//export async function GET(request: Request) {
//  const response = await fetch("https://api.vercel.app/products")
//  const products = await response.json()
//  return Response.json(products)
//}
export async function GET(request: Request){
  const url = new URL(request.url);
  const geracao = url.searchParams.get("geracao") || "";
  switch (geracao) {
    case "kanto":
      const kantoResponse = await fetch('https://pokeapi.co/api/v2/pokedex/kanto/');
      const kantoData = await kantoResponse.json();
      return Response.json(kantoData);
    case "johto":
      const johtoResponse = await fetch('https://pokeapi.co/api/v2/pokedex/original-johto/');
      const johtoData = await johtoResponse.json();
      return Response.json(johtoData);
    case "hoenn":
      const hoennReponse = await fetch('https://pokeapi.co/api/v2/pokedex/hoenn/');
      const hoennData = await hoennReponse.json();
      return Response.json(hoennData);
    case "sinnoh":
      const sinnohResponse = await fetch('https://pokeapi.co/api/v2/pokedex/original-sinnoh/');
      const sinnohData = await sinnohResponse.json();
      return Response.json(sinnohData);
    case "unova":
      const unovaResponse = await fetch('https://pokeapi.co/api/v2/pokedex/original-unova/');
      const unovaData = await unovaResponse.json();
      return Response.json(unovaData);
    case "kalos":
      const kalosResponse = await fetch('https://pokeapi.co/api/v2/pokedex/original-akala/');
      const kalosData = await kalosResponse.json();
      return Response.json(kalosData);
    case "alola":
      const alolaResponse = await fetch('https://pokeapi.co/api/v2/pokedex/original-alola/');
      const alolaData = await alolaResponse.json();
      return Response.json(alolaData);
    case "galar":
      const galarResponse = await fetch('https://pokeapi.co/api/v2/pokedex/galar/');
      const galarData = await galarResponse.json();
      return Response.json(galarData);
    case "paldea":
      const paldeaResponse = await fetch('https://pokeapi.co/api/v2/pokedex/paldea/');
      const paldeaData = await paldeaResponse.json();
      return Response.json(paldeaData);
    default:
      
      return new Response("Geração não encontrada", { status: 404 });
  }
}