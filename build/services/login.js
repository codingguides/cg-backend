// import {entitiesLogin} from  "../entities/login";//"../entities/login";
// export class Performance{
// public async dealershipPerformance(filter){
//     const month=filter.month[0].toUpperCase() + filter.month.slice(1).toLowerCase();
//     const store=filter.store[0].toUpperCase() + filter.store.slice(1).toLowerCase(); 
//     let projection;
//     let filters;
//     if(month=="All"){
//         projection='Store_state';
//         filters={'store':store,'year':filter.year}
//     }
//     else{
//         projection='Store_state.$';
//         filters={'store':store,'year':filter.year,'Store_state.month':month}
//     }
//     const payload={[projection]:1,'store':1,'year':1,dealersgroup:1}
//     const data =await entitiesLogin.findOne(filters,payload)
//     if(data==null){
//         return "No data match with give filter"
//     }
//     return data
// }}
//# sourceMappingURL=login.js.map