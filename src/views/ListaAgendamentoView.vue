<template>
  <v-app>
    <v-container class="py-8">
      <!-- Título -->
      <h1 class="text-h5 font-weight-bold mb-6 text-center">
        Painel de Agendamentos
      </h1>

      <!-- FILTRO DE DATA -->
      <v-card class="pa-4 mb-6 elevation-3 text-center">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="dataSelecionada"
              type="date"
              label="Filtrar por data"
              variant="outlined"
              hide-details
              density="comfortable"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4" md="3">
            <v-btn
              color="amber-darken-2"
              size="large"
              rounded
              block
              :loading="loading"
              @click="buscarAgendamentos"
            >
              Buscar
            </v-btn>
          </v-col>
        </v-row>
      </v-card>

      <!-- LISTA DE AGENDAMENTOS -->
      <v-row dense>
        <v-col
          v-for="(ag, i) in agendamentos"
          :key="i"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            class="pa-4 mb-4 elevation-3 rounded-xl position-relative"
            :class="{
              'border-success': !!ag.nCodigoUsuario
            }"
            :color="i % 2 === 0 ? 'grey-lighten-4' : 'white'"
          >
            <!-- Selo Verificado -->
            <v-chip
              v-if="ag.nCodigoUsuario"
              color="green-darken-2"
              text-color="white"
              size="small"
              class="font-weight-bold"
            >
              Verificado
            </v-chip>

            <div class="d-flex justify-space-between align-center mb-3">
              <div class="font-weight-bold text-amber-darken-2 text-subtitle-1">
                {{ formatarData(ag.dDia) }}
              </div>
              <v-chip
                color="amber-darken-2"
                text-color="white"
                class="font-weight-bold"
                size="small"
              >
                {{ ag.tHora.slice(0, 5) }}
              </v-chip>
            </div>

            <div class="text-body-2 mb-2">
              <strong>Nome:</strong> {{ ag.sNome || '-' }}
            </div>

            <div class="text-body-2 mb-2">
              <strong>WhatsApp:</strong> {{ ag.sWhatsapp || '-' }}
            </div>

            <div class="text-body-2 mb-2">
              <strong>Código Usuário:</strong> {{ ag.nCodigoUsuario || '-' }}
            </div>

            <v-divider class="my-3"></v-divider>

            <div class="d-flex justify-end">
              <v-btn
                variant="tonal"
                size="small"
                color="blue-darken-2"
                class="mr-2"
              >
                <v-icon start>mdi-pencil</v-icon> Editar
              </v-btn>
              <v-btn
                variant="tonal"
                size="small"
                color="red-darken-2"
              >
                <v-icon start>mdi-delete</v-icon> Excluir
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- SEM RESULTADOS -->
      <div
        v-if="!agendamentos.length && !loading"
        class="text-center text-grey-darken-2 mt-8"
      >
        Nenhum agendamento encontrado para esta data.
      </div>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const dataSelecionada = ref(new Date().toISOString().split('T')[0])
const agendamentos = ref([])
const loading = ref(false)

onMounted(() => {
  buscarAgendamentos()
})

async function buscarAgendamentos() {
  try {
    loading.value = true
    const body = { data: dataSelecionada.value }

    const response = await axios.post(
      import.meta.env.VITE_DEFAULT_API_LINK + '/agendamento/horario',
      body
    )

    agendamentos.value = response.data?.rows || []
    console.log('✅ Agendamentos recebidos:', agendamentos.value)
  } catch (error) {
    console.error('❌ Erro ao buscar agendamentos:', error)
  } finally {
    loading.value = false
  }
}

function formatarData(dataStr) {
  const data = new Date(dataStr + 'T00:00:00')
  return data.toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  })
}
</script>

<style scoped>
.text-center {
  text-align: center;
}

.v-card {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  border: 2px solid transparent;
}

.v-card.border-success {
  border-color: #43a047; /* Verde escuro Vuetify */
}

.v-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}

.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}

.top-2 {
  top: 8px;
}

.right-2 {
  right: 8px;
}
</style>
