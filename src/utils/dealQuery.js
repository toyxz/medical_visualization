const transQuery = (rowUrl, queryObj) => {
   const keys = Object.keys(queryObj);
   let length = keys.length;

   let url = rowUrl;
   url += '?';
   for (let i = 0; i < length-1; ++i) {
        url+=keys[i];
        url+='=';
        url+=queryObj[keys[i]];
        url+='&';
   }
   url+=keys[length-1];
   url+='=';
   url+=queryObj[keys[length-1]];
   return url;
};
  
module.exports = {
    transQuery,
};