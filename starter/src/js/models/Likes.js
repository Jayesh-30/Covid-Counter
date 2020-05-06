export default class Likes {
    constructor(){
        this.likes = [];
    }
    addLike(countries,slug){
        const { Country , TotalConfirmed}  = countries.find(cur => cur.Slug === slug);
        
        const like = {slug,Country,TotalConfirmed};
        this.likes.push(like);
        // Persisit data in localStorage
        this.persistData();
        return like;        
    }
    deleteLike(slug){
        const index = this.likes.findIndex(cur => cur.slug === slug);        
        this.likes.splice(index,1);
        // Persisit data in localStorage
        this.persistData();
    }

    persistData() {
        localStorage.setItem('likes',JSON.stringify(this.likes));     
    }
    
    readStorage() {
        const storage =  JSON.parse(localStorage.getItem('likes'));
        if(storage)
        this.likes = storage;
    }

    isLiked(slug){
        return this.likes.findIndex(cur => cur.slug === slug) !== -1;
    }
    getNumLikes(){
        return this.likes.length;
    }
}