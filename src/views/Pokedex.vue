<template>
  <div id="forest">
    <div id="pokedex">
      <div class="sensor">
        <button :class="{ 'sensor-pulsating': isLoading }"></button>
      </div>
      <div class="camera-display">
        <img
          v-if="pokemon.sprites.front_default !== '/'"
          v-bind:src="pokemon.sprites.front_default"
        />
      </div>
      <div class="divider"></div>
      <div class="stats-display" :style="{ opacity: opacity }">
        <h2>{{ pokemon.name }}</h2>
        <h3>Abilities</h3>
        <ul>
          <li>{{ pokemon.abilities[0].ability.name }}</li>
          <li>{{ pokemon.abilities[1].ability.name }}</li>
        </ul>
        <h3>Moves</h3>
        <ul>
          <li>{{ pokemon.moves[0].move.name }}</li>
          <li>{{ pokemon.moves[1].move.name }}</li>
        </ul>
      </div>
      <div class="botom-actions">
        <div id="actions" @click="searchRandomPokemom()">
          <button class="a"></button>
        </div>
        <div id="cross">
          <button @click="searchNextPokemon(true)" class="cross-button up"></button>
          <button @click="searchNextPokemon(true)" class="cross-button left"></button>
          <button @click="searchNextPokemon(false)" class="cross-button down"></button>
          <button @click="searchNextPokemon(false)" class="cross-button right"></button>
          <div class="cross-button center"></div>
        </div>
      </div>
      <div class="input-pad">
        <input
          @keypress.enter="searchByPokemonByNameOrNumber()"
          @change="isEmpty()"
          v-model="pokemonName"
          type="text"
          placeholder="Pokemon name"
        />
      </div>
      <div class="bottom-modes">
        <button class="level-button"></button>
        <button class="level-button"></button>
        <button class="level-button"></button>
        <button class="level-button"></button>
        <button
          :disabled="!pokemonName"
          @click="searchByPokemonByNameOrNumber()"
          class="pokedex-mode black-button"
        >
          Search
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { pokedexService } from "../services/pokedex.service";
export default {
  data() {
    return {
      pokemonName: "",
      pokemon: {
        name: "",
        abilities: [{ ability: { name: "" } }, { ability: { name: "" } }],
        moves: [{ move: { name: "" } }, { move: { name: "" } }],
        sprites: { front_default: "/" },
      },
      opacity: 0.3,
      isLoading: false,
      hasError: false,
      pokemonNumber: 0,
    };
  },
  methods: {
    clear() {
      Object.assign(this.$data, this.$options.data.call(this));
    },
    isEmpty() {
      if (this.pokemon.name == "") {
        this.opacity = 0.3;
        this.pokemon.mainImg = "";
      }
    },
    _showProgressBar() {
      const btns = document.querySelectorAll(".level-button");
      btns.forEach((el, index) => {
        setTimeout(() => {
          if (!this.hasError) {
            el.classList.add("progressbar");
          }
        }, index * 800);
      });
    },
    showProgressBar() {
      this.isLoading = true;
      this.hasError = false;
      this.clearProgressBar();
      this._showProgressBar();
    },
    clearProgressBar() {
      const btns = document.querySelectorAll(".level-button");
      btns.forEach(function (el, index) {
        el.classList.remove("progressbar");
      });
    },
    _clearProgressBar() {
      this.clear();
      this.clearProgressBar();
      this.isLoading = false;
      this.hasError = true;
    },
    _handleResponse(response) {
      if (response) {
        ["name", "abilities", "moves", "sprites"].forEach(
          (prop) => (this.pokemon[prop] = response[prop])
        );
        this.opacity = 1.0;
      } else {
        this._clearProgressBar();
      }
    },
    async searchByPokemonByNameOrNumber() {
      this.showProgressBar();
      const response = await pokedexService.searchByPokemonByNameOrNumber(
        this.pokemonName
      );
      this._handleResponse(response);
      this.isLoading = false;
    },
    async searchNextPokemon(leftOrRight) {
      this.showProgressBar();
      leftOrRight === true ? this.pokemonNumber++ : this.pokemonNumber--;

      this.pokemonNumber =
        this.pokemonNumber <= 0
          ? 150
          : this.pokemonNumber >= 150
          ? 150
          : this.pokemonNumber;

      const response = await pokedexService.searchByPokemonByNameOrNumber(
        this.pokemonNumber
      );
      this._handleResponse(response);
      this.isLoading = false;
    },
    async searchRandomPokemom() {
      this.showProgressBar();
      const response = await pokedexService.searchByPokemonByNameOrNumber(
        Math.floor(Math.random() * 151)
      );
      this._handleResponse(response);
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
@import "../assets/pokedex.css";
</style>
