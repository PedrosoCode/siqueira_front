<template>
  <v-app>
    <v-container class="py-8">
      <!-- Título -->
      <h1 class="text-h5 font-weight-bold mb-6 text-center">
        Agende seu horário
      </h1>

      <v-row justify="center" align="start" class="mb-8">
        <!-- Calendário -->
        <v-col cols="12" md="5">
          <v-card class="pa-4 elevation-3 text-center">
            <h2 class="text-subtitle-1 font-weight-medium mb-4">
              Escolha a data
            </h2>

            <!-- Navegação de meses -->
            <div class="d-flex align-center justify-space-between mb-2">
              <v-btn
                variant="text"
                color="grey-darken-2"
                @click="mudarMes(-1)"
              ><</v-btn>

              <strong class="text-grey-darken-3">{{ mesAtualNome }} {{ anoAtual }}</strong>

              <v-btn
                variant="text"
                color="grey-darken-2"
                @click="mudarMes(1)"
              >></v-btn>
            </div>

            <v-date-picker
              v-model="dataSelecionada"
              color="amber-darken-2"
              elevation="0"
              :min="hojeISO"
              :max="limiteISO"
              show-adjacent-months
              locale="pt"
              :month="mesAtual"
              :year="anoAtual"
              @update:month="mesAtual = $event"
              @update:year="anoAtual = $event"
            ></v-date-picker>
          </v-card>
        </v-col>

        <!-- Horários -->
        <v-col cols="12" md="5">
          <v-card class="pa-4 elevation-3">
            <h2 class="text-subtitle-1 font-weight-medium mb-4">
              Horários disponíveis
            </h2>

            <v-row>
              <v-col
                v-for="(hora, i) in horarios"
                :key="i"
                cols="6"
                sm="4"
                md="4"
              >
                <v-btn
                  block
                  rounded="lg"
                  :disabled="horariosOcupados.includes(hora)"
                  :color="
                    horariosOcupados.includes(hora)
                      ? 'grey-lighten-1'
                      : horaSelecionada === hora
                      ? 'amber-darken-2'
                      : 'grey-lighten-3'
                  "
                  :variant="horaSelecionada === hora ? 'flat' : 'tonal'"
                  @click="!horariosOcupados.includes(hora) && (horaSelecionada = hora)"
                >
                  <span
                    :class="
                      horariosOcupados.includes(hora)
                        ? 'text-grey-darken-2'
                        : horaSelecionada === hora
                        ? 'text-white'
                        : 'text-grey-darken-3'
                    "
                  >
                    {{ hora }}
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!-- Confirmação -->
      <div class="text-center mt-8">
        <v-btn
          color="amber-darken-2"
          size="large"
          rounded
          :disabled="!dataSelecionada || !horaSelecionada"
          @click="confirmarAgendamento"
        >
          Confirmar agendamento
        </v-btn>

        <div v-if="mensagemConfirmacao" class="mt-4 text-success">
          {{ mensagemConfirmacao }}
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import axios from 'axios'

const hoje = new Date()
hoje.setHours(0, 0, 0, 0)
const hojeISO = hoje.toISOString().split('T')[0]

const limite = new Date(new Date().getFullYear() + 1, 11, 31)
limite.setHours(23, 59, 59, 999)
const limiteISO = limite.toISOString().split('T')[0]

const dataSelecionada = ref(hojeISO)
const horaSelecionada = ref(null)
const mensagemConfirmacao = ref('')
const horariosOcupados = ref([])

const data = new Date()
const mesAtual = ref(data.getMonth())
const anoAtual = ref(data.getFullYear())

const nomesMeses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const mesAtualNome = computed(() => nomesMeses[mesAtual.value])

const horarios = [
  '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
]

watch([mesAtual, anoAtual, dataSelecionada], ([novoMes, novoAno, novaData], [antMes, antAno, antData]) => {
  if (novoMes !== antMes || novoAno !== antAno || novaData !== antData) {
    enviarMesParaAPI(novaData)
  }
})

function confirmarAgendamento() {
  mensagemConfirmacao.value = `✅ Agendamento confirmado para ${dataSelecionada.value.split('-').reverse().join('/')} às ${horaSelecionada.value}.`
}

function mudarMes(direcao) {
  let novoMes = mesAtual.value + direcao
  let novoAno = anoAtual.value

  if (novoMes > 11) {
    novoMes = 0
    novoAno++
  } else if (novoMes < 0) {
    novoMes = 11
    novoAno--
  }

  mesAtual.value = novoMes
  anoAtual.value = novoAno
}

async function enviarMesParaAPI(data) {
  try {
    const body = { data }
    const response = await axios.post(
      import.meta.env.VITE_DEFAULT_API_LINK + '/agendamento/horario',
      body
    )

    const rows = response.data?.rows || []
    horariosOcupados.value = rows.map(r => r.tHora.slice(0, 5))

    console.log('✅ Dados recebidos:', horariosOcupados.value)
  } catch (error) {
    console.error('❌ Erro ao enviar data para API:', error)
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
