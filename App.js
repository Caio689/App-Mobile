import 'react-native-gesture-handler';
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const { width } = Dimensions.get("window");


// ================= Tela inicial =================
function HomeScreen({ chamados, setChamados, navigation }) {
  const [filtro, setFiltro] = useState("Todos");
  const [busca, setBusca] = useState("");

  const filtrar = () => {
    return chamados.filter((c) => {
      const matchFiltro =
        filtro === "Todos" || c.status === filtro;
      const matchBusca = c.titulo
        .toLowerCase()
        .includes(busca.toLowerCase());
      return matchFiltro && matchBusca;
    });
  };

  const contar = (status) =>
    chamados.filter((c) => c.status === status).length;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Chamados</Text>
        <Text style={styles.subtitle}>Seus tickets de TI</Text>

        <View style={styles.cardsRow}>
          <InfoCard numero={contar("Aberto")} label="Abertos" />
          <InfoCard numero={contar("Em Progresso")} label="Em Progresso" />
          <InfoCard numero={contar("Resolvido")} label="Resolvidos" />
        </View>

        <TextInput
          placeholder="Buscar chamados..."
          style={styles.search}
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <View style={styles.filtros}>
        {["Todos", "Aberto", "Em Progresso", "Resolvido"].map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filtroBtn,
              filtro === f && styles.filtroAtivo,
            ]}
            onPress={() => setFiltro(f)}
          >
            <Text style={filtro === f ? styles.filtroTextoAtivo : styles.filtroTexto}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtrar()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>

            <View style={styles.footerCard}>
              <Text style={styles.tag}>{item.categoria}</Text>
              <Text style={styles.tempo}>há {item.dias} dias</Text>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("NovoChamado")}
      >
        <Text style={{ color: "#fff", fontSize: 28 }}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


// ================= NOVO CHAMADO =================
function NovoChamadoScreen({ navigation, addChamado }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("Média");
  const [categoria, setCategoria] = useState("Hardware");
  const [nome, setNome] = useState("");

  const criar = () => {
    if (!titulo || !descricao) return;

    addChamado({
      titulo,
      descricao,
      categoria,
      status: "Aberto",
      dias: 0,
    });

    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style= {styles.label}>Título</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />

      <Text style= {styles.label}>Descrição</Text>
      <TextInput
        style= {[styles.input, { height: 100 }]}
        multiline
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Prioridade</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {["Baixa", "Média", "Alta", "Crítica"].map((p) => (
          <TouchableOpacity
            key={p}
            style={[
              styles.prioridadeBtn,
              prioridade === p && styles.prioridadeAtivo,
            ]}
            onPress={() => setPrioridade(p)}
          >
            <Text>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Categoria</Text>
      <TextInput
        style={styles.input}
        value={categoria}
        onChangeText={setCategoria}
      />

      <Text style={styles.label}>Seu Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <TouchableOpacity style={styles.botao} onPress={criar}>
        <Text style={{ color: "#fff" }}>Criar Chamado</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


// ================= PERFIL =================
function PerfilScreen() {
  const [nome, setNome] = useState("Maria Silva");
  const [email, setEmail] = useState("maria.silva@empresa.com");
  const [telefone, setTelefone] = useState("(11) 98765-4321");
  const [departamento, setDepartamento] = useState("Recursos Humanos");

  const salvarPerfil = () => {
    alert("Perfil atualizado com sucesso!");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View style={perfilStyles.container}>
        
        {/* Avatar */}
        <View style={perfilStyles.avatar}>
          <Text style={perfilStyles.avatarText}>
            {nome.charAt(0).toUpperCase()}
          </Text>
        </View>

        {/* Nome */}
        <Text style={perfilStyles.sectionTitle}>Nome</Text>
        <TextInput
          style={perfilStyles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite seu nome"
        />

        {/* Email */}
        <Text style={perfilStyles.sectionTitle}>Email</Text>
        <TextInput
          style={perfilStyles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          keyboardType="email-address"
        />

        {/* Telefone */}
        <Text style={perfilStyles.sectionTitle}>Telefone</Text>
        <TextInput
          style={perfilStyles.input}
          value={telefone}
          onChangeText={setTelefone}
          placeholder="Digite seu telefone"
          keyboardType="phone-pad"
        />

        {/* Departamento */}
        <Text style={perfilStyles.sectionTitle}>Departamento</Text>
        <TextInput
          style={perfilStyles.input}
          value={departamento}
          onChangeText={setDepartamento}
          placeholder="Digite o departamento"
        />

        {/* Botão salvar */}
        <TouchableOpacity
          style={perfilStyles.botaoSalvar}
          onPress={salvarPerfil}
        >
          <Text style={perfilStyles.botaoTexto}>
            Salvar Alterações
          </Text>
        </TouchableOpacity>

        {/* Botão sair */}
        <TouchableOpacity style={perfilStyles.logout}>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            Sair
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


// ================= NAVEGAÇÃO =================
function Tabs({ chamados, setChamados }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Início">
        {(props) => (
          <HomeScreen {...props} chamados={chamados} setChamados={setChamados} />
        )}
      </Tab.Screen>

      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}


// ================= APP =================
export default function App() {
  const [chamados, setChamados] = useState([
    {
      id: "1",
      titulo: "Sistema de email não enviando",
      descricao: "Erro SMTP",
      status: "Aberto",
      categoria: "Infraestrutura",
      dias: 19,
    },
  ]);

  const addChamado = (novo) => {
    setChamados([
      {
        id: Math.random().toString(),
        ...novo,
      },
      ...chamados,
    ]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {(props) => (
            <Tabs {...props} chamados={chamados} setChamados={setChamados} />
          )}
        </Stack.Screen>

        <Stack.Screen name="NovoChamado">
          {(props) => (
            <NovoChamadoScreen {...props} addChamado={addChamado} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// ================= ESTILOS =================
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2d5be3",
    padding: 20,
  },

  title: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  subtitle: { color: "#ddd", marginBottom: 15 },

  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoCard: {
    backgroundColor: "#4b77f3",
    padding: 10,
    borderRadius: 10,
    width: width / 3.5,
  },

  search: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginTop: 10,
    padding: 10,
  },

  filtros: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },

  filtroBtn: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 20,
  },

  filtroAtivo: {
    backgroundColor: "#2d5be3",
  },

  filtroTexto: { color: "#000" },
  filtroTextoAtivo: { color: "#fff" },

  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },

  titulo: { fontWeight: "bold" },
  descricao: { color: "#666" },

  footerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  tag: { backgroundColor: "#eee", padding: 5, borderRadius: 10 },
  tempo: { color: "#999" },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 40,
    backgroundColor: "#2d5be3",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  label: { marginTop: 10 },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },

  prioridadeBtn: {
    padding: 10,
    borderWidth: 1,
    margin: 5,
    borderRadius: 10,
  },

  prioridadeAtivo: {
    backgroundColor: "#2d5be3",
  },

  botao: {
    backgroundColor: "#2d5be3",
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  infoBox: {
    padding: 15,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginBottom: 10,
  },

  logout: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "red",
    alignItems: "center",
  },
});

const perfilStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#dbe7ff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 25,
    marginTop: 10,
  },

  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#2d5be3",
  },

  sectionTitle: {
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
    color: "#555",
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },

  botaoSalvar: {
    backgroundColor: "#2d5be3",
    marginTop: 25,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  logout: {
    marginTop: 15,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ffb3b3",
    backgroundColor: "#fff5f5",
    alignItems: "center",
  },
});


const InfoCard = ({ numero, label }) => (
  <View style={styles.infoCard}>
    <Text style={{ color: "#fff", fontWeight: "bold" }}>{numero}</Text>
    <Text style={{ color: "#fff" }}>{label}</Text>
  </View>
);