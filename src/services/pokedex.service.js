import _axios from "../plugins/axios";

export const pokedexService = {
  searchByPokemonByNameOrNumber,
};

async function searchByPokemonByNameOrNumber(nameOrNumber) {
  try {
    const response = await _axios.get(`/pokemon/${nameOrNumber}`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    return false;
  }
}
