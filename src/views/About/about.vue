<template>
  <page title="Sobre">
    <div class="h-4"></div>
    <div>
      <h3 class="mb-4">
        Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt
        ornare massa. <br />
        Pellentesque habitant morbi tristique senectus et netus et malesuada. Justo laoreet sit amet cursus sit amet Hendrerit dolor magna eget est
        lorem.
        <br />
        Risus feugiat in ante metus dictum at tempor commodo ullamcorper.<br />
        Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra
        accumsan. Ornare lectus sit amet est placerat in egestas erat imperdiet.
      </h3>
      <h3>
        Semper auctor neque vitae tempus quam pellentesque nec nam.Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt
        ornare massa. <br />
        Justo laoreet sit amet cursus sit amet Hendrerit dolor magna eget est
        lorem. <br />
        Ornare lectus sit amet est placerat in egestas erat imperdiet.Risus feugiat in ante metus dictum at tempor commodo ullamcorper. <br />
        Elementum nibh tellus molestie nunc non blandit.
      </h3>
    </div>
    <div class="h-4"></div>
    <v-container>
      <v-card>
        <v-row class="px-2 py-2">
          <v-col cols="3" sm="3" md="3" lg="3">
            <img src="/error-icon.png" style="width: 90%" />
          </v-col>
          <v-col cols="9" sm="9" md="9" lg="9">
            <h3>
              Vestibulum mattis ullamcorper velit sed ullamcorper morbi
              tincidunt ornare massa. <br />
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada. <br />
              Risus feugiat in ante metus dictum at tempor commodo
              ullamcorper.<br />
              Ullamcorper morbi tincidunt ornare massa eget egestas purus
              viverra accumsan.
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
      <div class="h-4"></div>
      <v-card>
        <v-row class="px-2 py-2">
          <v-col cols="9" sm="9" md="9" lg="9">
            <h3 class="text-right">
              Vestibulum mattis ullamcorper velit sed ullamcorper morbi
              tincidunt ornare massa. <br />
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada. <br />
              Risus feugiat in ante metus dictum at tempor commodo
              ullamcorper.<br />
              Ullamcorper morbi tincidunt ornare massa eget egestas purus
              viverra accumsan.
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
            <img src="/error-icon.png" style="width: 90%" />
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
.h-4 {
  height: 4rem;
}

.jce {
  justify-content: end;
}
</style>
