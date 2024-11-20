import { View, Text, FlatList,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {Colors} from '../../../constants/Colors'
import { useDispatch } from 'react-redux'
import { setLoggedIn } from '../../store/slice/loginStatusSlice'
import {useRouter} from 'expo-router'

const MenuList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const menuList = [
        {
            id:4,
            name:'Logout',
            icon:require('../../assets/images/logout.png'),
            path:"logout"
        },
    ]
    const onMenuClick = (item)=>{
        if(item.path=='logout'){
          dispatch(setLoggedIn(false));
          router.push('/Login')
          return ;
        }
    }
  return (
    <View style={{ 
        marginTop:50
     }}>
      <FlatList
        numColumns={2}
        data={menuList}
        renderItem={({item,index})=>(
            <TouchableOpacity onPress={()=>onMenuClick(item)} style={{ 
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                gap:10,
                flex:1,
                padding:10,
                borderRadius:10,
                borderWidth:1,
                margin:10,
                backgroundColor:'white',
                borderColor:Colors.primary
             }}>
                <Image source={item.icon} style={{height:50,width:50}}/>
                <Text style={{ fontFamily:'poppins-medium',fontSize:16,flex:1 }}>{item?.name}</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default MenuList