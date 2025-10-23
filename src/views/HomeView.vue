<template>
  <v-app>
    <!-- Hero Section -->
    <v-container fluid class="bg-grey-darken-4 text-center py-16">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h1 class="text-h3 text-white font-weight-bold mb-4">
            Siqueira Barbearia
          </h1>
          <p class="text-grey-lighten-1 mb-6">
            Estilo, tradição e cuidado em cada corte.  
            Sua melhor versão começa aqui.
          </p>
          <v-btn color="amber-darken-2" size="large" rounded>
            Agendar agora
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Sobre -->
    <v-container class="py-12">
      <v-row align="center">
        <v-col cols="12" md="6">
          <v-img
            src="https://images.unsplash.com/photo-1621609773852-7e5d52c6da2f"
            alt="Barbearia"
            class="rounded-lg elevation-3"
          ></v-img>
        </v-col>
        <v-col cols="12" md="6">
          <h2 class="text-h4 font-weight-bold mb-4">Sobre nós</h2>
          <p class="text-body-1 text-grey-darken-1">
            A Siqueira Barbearia é referência em estilo e qualidade.
            Nosso ambiente foi criado para oferecer conforto e um atendimento
            de primeira, com barbeiros experientes e apaixonados pelo que fazem.
          </p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Serviços -->
    <v-container class="py-12 bg-grey-lighten-4">
      <h2 class="text-h4 font-weight-bold text-center mb-8">Nossos Serviços</h2>
      <v-row justify="center" align="stretch">
        <v-col cols="12" md="3" sm="6" v-for="(servico, i) in servicos" :key="i">
          <v-card class="text-center pa-6 elevation-3">
            <v-icon size="48" color="amber-darken-2" class="mb-4">{{ servico.icon }}</v-icon>
            <h3 class="text-h6 font-weight-bold mb-2">{{ servico.titulo }}</h3>
            <p class="text-body-2 text-grey-darken-1">{{ servico.descricao }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Depoimentos -->
    <v-container class="py-12">
      <h2 class="text-h4 font-weight-bold text-center mb-8">O que dizem nossos clientes</h2>
      <v-row justify="center" align="stretch">
        <v-col cols="12" md="4" v-for="(depo, i) in depoimentos" :key="i">
          <v-card class="pa-6 text-center elevation-2">
            <v-avatar size="64" class="mx-auto mb-4">
              <v-img :src="depo.foto"></v-img>
            </v-avatar>
            <p class="text-body-2 mb-4">"{{ depo.texto }}"</p>
            <strong>{{ depo.nome }}</strong>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Contato -->
    <v-container fluid class="py-12 bg-grey-darken-4 text-center text-white">
      <h2 class="text-h4 font-weight-bold mb-6">Entre em contato</h2>
      <p class="text-grey-lighten-1 mb-4">Rua Principal, 123 - Centro, Cidade/UF</p>
      <p class="text-grey-lighten-1 mb-6">(11) 99999-9999 | contato@siqueirabarbearia.com</p>
      <v-btn color="amber-darken-2" size="large" rounded>
        Agendar horário
      </v-btn>
    </v-container>

    <!-- Rodapé -->
    <v-footer class="bg-grey-darken-3 text-center text-grey-lighten-1 py-4">
      <v-col>
        © {{ new Date().getFullYear() }} — Siqueira Barbearia. Todos os direitos reservados.
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
const servicos = [
  {
    icon: 'mdi-content-cut',
    titulo: 'Corte Masculino',
    descricao: 'Cortes modernos e clássicos feitos sob medida para você.',
  },
  {
    icon: 'mdi-razor-double-edge',
    titulo: 'Barba Completa',
    descricao: 'Modelagem, tosa e acabamento com toalha quente.',
  },
  {
    icon: 'mdi-scissors-cutting',
    titulo: 'Corte Infantil',
    descricao: 'Os pequenos também merecem um visual de respeito.',
  },
  {
    icon: 'mdi-hair-dryer',
    titulo: 'Tratamentos',
    descricao: 'Hidratação, coloração e cuidados especiais para o cabelo.',
  },
]

const depoimentos = [
  {
    nome: 'Lucas Pereira',
    texto: 'Atendimento excelente e ambiente incrível. Melhor barbearia da cidade!',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    nome: 'Thiago Santos',
    texto: 'Os caras mandam bem demais, sempre saio satisfeito.',
    foto: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    nome: 'André Oliveira',
    texto: 'Top demais! Atendimento de primeira e o corte sempre impecável.',
    foto: 'https://randomuser.me/api/portraits/men/50.jpg',
  },
]
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
