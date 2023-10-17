// import React, {useState, useEffect} from 'react';
// import {FlatList, View} from 'react-native';
// import CatchUpCard from './cards/LiveCard';

// export default function CatchUpRails() {
//   const [catchUp, setCatchUp] = useState([]);
//   console.log('DATA', catchUp);
//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         `https://zznylmsrqi.execute-api.us-east-2.amazonaws.com/vprism/cms/videolistv2?account_id=61a0c96ed4f9d00009d0f691&portal_id=64f1e7ba1496c9000811f517&master_profile_id=64f17c33234f220008803d38&pgindex=0&pgitems=30`,
//         {
//           method: 'GET',
//         },
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.json();

//       setCatchUp(result);
//     } catch (error) {
//       console.error('Error message', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <View>
//       <FlatList
//         horizontal
//         data={catchUp}
//         renderItem={({item}) => <CatchUpCard item={item} />}
//         keyExtractor={(item, index) => index.toString()} // Assuming index can be used as a key
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{flexDirection: 'row'}}
//       />
//     </View>
//   );
// }
