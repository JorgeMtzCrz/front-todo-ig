import swr from 'swr'
import  {FETCH_ALL, ALL_URL} from '../services/taskServices'


export function allTask () {
  const { data, error } = swr(ALL_URL, FETCH_ALL)
  return {
    data, error
  }
}