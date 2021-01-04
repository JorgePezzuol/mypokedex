import _axios from "../plugins/axios";

export const pokedexService = {
  searchByPokemonName,
};

async function searchByPokemonName(name) {
  try {
    const response = await _axios.get(`/pokemon/${name}`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    return false;
  }
}
