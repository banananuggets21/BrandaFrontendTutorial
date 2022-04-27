import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

export default function LibraryHours() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      fetch("http://brandaserver.herokuapp.com/getinfo/libraryHours/week")
        .then((response) => response.json( ))
        .then((json) => {
          setData(json);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    fetchData();
  },[]);

  const renderLocation = ({item}) => (
    <View>
      <View style = {{flexDirection:"row", padding:5}}>
        <View style = {{flex:1}}>
          <Text>{item.location}</Text>
        </View>
        <View style = {{flex:1, alignItems:"flex-end"}}>
          <Text>{item.times.hours == null ? 
            "Closed" : 
            item.times.hours[0].from+" - "+item.times.hours[0].to}</Text>
        </View>
      </View>     
    </View>
  );

  const renderDay = ({item}) => (
    <View style={styles}>
      <View style={styles.item_day}>
        <Text style={{fontSize:18,color:"white"}}>{item.day}, {item.date}</Text>
      </View>
      <View style={styles.item_location}>
        <FlatList
          data={item.hours}
          renderItem={renderLocation}
          keyExtractor={item => item.location}
        />  
      </View>
       
    </View>
  );
  
  return (
    
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(data)}</Text> */}
      <FlatList
        data={data}
        renderItem={renderDay}
        keyExtractor={item => item.day}
      />
    </View>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
  },

  item_day: {
    backgroundColor: "#483d8b",
    marginVertical: 5,
    padding:5
  },

  item_location: {
    backgroundColor: "#6a5acd",
    padding:5
  },
});
