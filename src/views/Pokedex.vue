<template>
  <div id="forest">
    <div id="pokedex">
      <div class="sensor">
        <button></button>
      </div>
      <div class="camera-display">
        <img v-bind:src="pokemon.mainImg" />
      </div>
      <div class="divider"></div>
      <div class="stats-display" :style="{ opacity: opacity }">
        <h2>{{ pokemon.name }}</h2>
        <h3>Abilities</h3>
        <ul>
          <li>{{ pokemon.firstAbility }}</li>
          <li>{{ pokemon.secondAbility }}</li>
        </ul>
        <h3>Moves</h3>
        <ul>
          <li>{{ pokemon.firstMove }}</li>
          <li>{{ pokemon.secondMove }}</li>
        </ul>
      </div>
      <div class="botom-actions">
        <div id="actions">
          <button class="a"></button>
        </div>
        <div id="cross">
          <button class="cross-button up"></button>
          <button class="cross-button right"></button>
          <button class="cross-button down"></button>
          <button class="cross-button left"></button>
          <div class="cross-button center"></div>
        </div>
      </div>
      <div class="input-pad">
        <input @change="isEmpty()" v-model="pokemon.name" type="text" />
      </div>
      <div class="bottom-modes">
        <button class="level-button"></button>
        <button class="level-button"></button>
        <button class="level-button"></button>
        <button class="level-button"></button>
        <button @click="searchByPokemonName()" class="pokedex-mode black-button">
          Pokedex
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
      pokemon: {
        mainImg: "",
        name: "",
        firstAbility: "",
        secondAbility: "",
        firstMove: "",
        secondMove: "",
      },
      opacity: 0.3,
    };
  },
  methods: {
    isEmpty() {
      if (this.pokemon.name == "") {
        this.opacity = 0.3;
        this.pokemon.mainImg = "";
      }
    },
    async searchByPokemonName() {
      const response = await pokedexService.searchByPokemonName(this.pokemon.name);

      if (response) {
        this.pokemon.firstAbility = response.abilities[0].ability.name;
        this.pokemon.secondAbility = response.abilities[1].ability.name;
        this.pokemon.firstMove = response.moves[0].move.name;
        this.pokemon.secondMove = response.moves[1].move.name;
        this.pokemon.mainImg = response.sprites.front_default;
        this.opacity = 1.0;
      } else {
        this.pokemon.name = "err";
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/pokedex.css";
</style>
