import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { Provider as PaperProvider, Button, Checkbox } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import About from "./components/About";
import ItemDetail from "./components/ItemDetail";
import LibraryHours from "./components/LibraryHours";

const HomeNavigator = createNativeStackNavigator();

const Home = () => {
  const [num, setNum] = useState(0);
  const [todoData, setTodoData] = useState([]);
  const [changed, setChanged] = useState(false);
  const todoList = require("./todoList.json").todo;

  useEffect(() => {
    setTodoData(todoList); 
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Checkbox
        status={item.done ? "checked" : "unchecked"}
        onPress={() => {
          markItemDone(todoData.indexOf(item));
        }}
      />
      <Text>{item.name}</Text>
      <Text>{item.due}</Text>
        
    </View>
  );
 
  function markItemDone(index){
    let todoCopy = todoData;
    todoCopy[index].done = !todoCopy[index].done;
    setTodoData(todoCopy);
    setChanged(!changed);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={todoData}
        renderItem={renderItem}
        keyExtractor={item => item.due}
        extraData={changed}
      />

      <Button style={styles.button} mode={"contained"} onPress={() => setTodoData(todoData.filter(todo => todo.done == false))}>
        Hide checked items
      </Button>
      <Button style={styles.button} mode={"contained"} onPress={() => setTodoData(todoList)}>
        Show checked items
      </Button>

      <Text style={{fontSize:20}}>Num is {num}</Text>
      <Button style={styles.button} mode={"contained"} onPress={() => setNum(num + 1)}>
        Increase num by 1.
      </Button>    
      <Button style={styles.button} mode={"contained"} onPress={() => setNum(num - 1)}>
        Decrease num by 1.
      </Button>  
      <Button style={styles.button} mode={"contained"} onPress={() => setNum(num * 2)}>
        Multiply num by 2.
      </Button> 
      <Button style={styles.button} mode={"contained"} onPress={() => setNum(0)}>
        Reset num.
      </Button> 
    </View>
  );
};

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        
        <HomeNavigator.Navigator initialRouteName="LibraryHours">
          <HomeNavigator.Screen 
            name={"Home"} 
            component={Home} 
            options={({navigation}) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("About")}>
                  <View style={styles.headerRight}>
                    <Text style = {styles.text}>About</Text>
                    <AntDesign name="infocirlceo" size={24} color="black" />
                  </View>
                </TouchableOpacity>
              )
            })} />
          
          <HomeNavigator.Screen 
            name={"About"} 
            component={About} 
            options={({navigation}) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                  <View style={styles.headerRight}>
                    <Text style = {styles.text}>Home</Text>
                    <FontAwesome name="home" size={24} color="black" />
                  </View>
                </TouchableOpacity>
              )
            })} />

          <HomeNavigator.Screen 
            name={"LibraryHours"} 
            component={LibraryHours} 
            options={({navigation}) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                  <View style={styles.headerRight}>
                    <Text style = {styles.text}>Home</Text>
                    <FontAwesome name="home" size={24} color="black" />
                  </View>
                </TouchableOpacity>
              )
            })} />

          <HomeNavigator.Screen name={"Item Detail"} component={ItemDetail}/>

        </HomeNavigator.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    
  },

  text: {
    fontSize:18,  
    padding:3 
  },

  button: {
    margin:3
  },

  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
  },

  checkbox: {
    alignSelf: "center",
  },
});
