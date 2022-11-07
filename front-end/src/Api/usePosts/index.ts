import { useQuery } from 'react-query'
import { DataService } from "@Services/DataService";

const usePosts = () => {
    return useQuery(['posts'], () => DataService.getPosts())
}

export { usePosts }
