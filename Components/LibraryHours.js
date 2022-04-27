import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

export default function LibraryHours() {
  const [data, setData] = useState(0);

  useEffect(() => {
    async function fetchData() {
        const response = await fetch("http://brandaserver.herokuapp.com/getinfo/libraryHours/week");
        const json = await response.json();
        setData(json);
      }
      fetchData();
  }, []);

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

  const renderItem = ({item}) => {
    const list = () => {
      return item.hours.map((element) => {
        var text =JSON.stringify(element.times.hours);
        if(text!=undefined){
          text = text.replace(/[{"\[\],}]/g, "");
          text = text.replace(/to:/g,"-");
          text = text.replace(/from:/g,"");
        }
        return (
          <DataTable.Row key={element.location} style={{flex:1,textAlign:"right"}}>
            <DataTable.Cell style={{flex:"1",justifyContent:"flex-start"}}>{element.location}</DataTable.Cell>
            <DataTable.Cell style={{flex:"0.5",justifyContent:"flex-end"}}>{text}</DataTable.Cell>
          </DataTable.Row>
        );
      });
    };
  
  return (
    
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(data)}</Text> */}
      <FlatList
        data={data}
        renderItem={renderItem}
        renderLocation={renderLocation}
        keyExtractor={item => item.day}
      />
    </View>
  );

  
}
}
