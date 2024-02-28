<template>
  <page title="Sobre">
    <div class="about__desc">
      <h3>
        A Funerária Digital Doc é uma plataforma com o objectivo de simplificar
        o dia-a-dia dos funcionários de uma funerária.
      </h3>
      <br />
      <h3>
        Centralizando toda a informação num único local, a plataforma permite
        registar declarações de óbito, exportar os dados em diferentes
        modelos, necessários para a realização de funerais, e gerir os dados
        dos clientes.
      </h3>
    </div>

    <v-container>
      <v-card elevation="0">
        <v-row class="px-2 py-2">
          <v-col cols="3" sm="3" md="3" lg="3">
            <img
              class="about__profile-photo"
              src="@/assets/photos/rafa_photo.jpeg"
            />
          </v-col>
          <v-col cols="9" sm="9" md="9" lg="9" class="about__profile-info">
            <h3>
              Natural de Tomar, licenciado em Engenharia Informática, com 5 anos
              de experiência em desenvolvimento web. Atualmente a trabalhar como
              front-end developer na empresa Mercedes-Benz.io
            </h3>
            <div class="contacts">
              <div class="contacts__element">
                <v-btn
                  class="contacts__linkedin"
                  color="blue"
                  icon="mdi-linkedin"
                  @click="
                    redirectLinkedin(
                      'https://www.linkedin.com/in/rafael-lopes-79851a150/'
                    )
                  "
                />
                <p>Rafael Lopes</p>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
      <v-card elevation="0">
        <v-row class="px-2 py-2">
          <v-col class="about__profile-info" cols="9" sm="9" md="9" lg="9">
            <h3 class="text-left">
              Natural do Entroncamento, licenciado em Engenharia Informática,
              com 4 anos de experiência em desenvolvimento web. Atualmente a
              trabalhar como full-stack developer na empresa NOS.
            </h3>
            <div class="contacts">
              <div class="contacts__element jce">
                <p>João Alves</p>
                <v-btn
                  class="contacts__linkedin"
                  color="blue"
                  icon="mdi-linkedin"
                  @click="
                    redirectLinkedin(
                      'https://www.linkedin.com/in/jo%C3%A3o-alves-84aba4223/'
                    )
                  "
                />
              </div>
            </div>
          </v-col>
          <v-col cols="3" sm="3" md="3" lg="3">
            <img
              class="about__profile-photo"
              src="@/assets/photos/joao_photo.jpeg"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </page>
</template>

<script setup lang="ts">
import Page from '../../components/shared/Page/page.vue';

const redirectLinkedin = (url: string) => window.open(url);
</script>

<style lang="scss">
.about {
  &__desc {
    margin: 2rem 0 3rem 0;
  }

  &__profile-photo {
    border-radius: 25%;
    width: 100%;
  }

  &__profile-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 3rem;
  }
}

.contacts {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;

  &__title {
    margin-bottom: 1rem;
  }

  &__element {
    display: flex;
    align-items: center;
    gap: 1rem;

    > p {
      font-size: 1.2rem;
    }
  }

  &__linkedin {
    cursor: pointer;
  }
}

.jce {
  justify-content: end;
}
</style>
