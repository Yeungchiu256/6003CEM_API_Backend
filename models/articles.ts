import * as db from '../helpers/database';


export const getAll = async () => {
  let query = 'select * from articles';
  let data = await db.run_query(query, null);
  return data;
}

export const getID = async (id: any) => {
  let query = 'select * from articles where ID = ?';  // must add ?
  let values = [id];
  let data = await db.run_query(query, values);
  return data;
}


//update article
export const update = async (id: number, article: any) => {
  let keys = Object.keys(article);
  let values = Object.values(article);
  //console.log(values);
  //let key = keys.join('=?,');
  //let parm = '';
  let updates = '';
  for (let i: number = 0; i < values.length; i++) {
    //parm += '?,';
    updates += `${keys[i]}=?,`
  }
  updates = updates.slice(0, -1);
  //console.log(parm);
  //console.log('key is ' + key);
  //console.log(updates);
  let sql = `UPDATE articles SET ${updates} WHERE id = ${id}`;
  console.log(sql);
  try {
    await db.run_update(sql, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}

export const add = async (article: any) => {
  let keys = Object.keys(article);
  let values = Object.values(article);
  let key = keys.join(',');
  let parm = '';
  for(let i: number = 0; i<values.length; i++) { parm += '?,'}
  parm =parm.slice(0,-1);
  let sql = `INSERT INTO articles (${key}) VALUES (${parm})`;
  console.log(sql);
  try{
      await db.run_insert(sql, values);
      return {status: 201};
    } catch(err: any) {
  return err; }
}

