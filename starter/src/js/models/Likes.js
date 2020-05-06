export default class Likes {
    constructor(){
        this.likes = [];
    }
    addLike(countries,slug){
        const { Country , TotalConfirmed}  = countries.find(cur => cur.Slug === slug);
        
        const like = {slug,Country,TotalConfirmed};
        this.likes.push(like);
        return like;        
    }
    deleteLike(slug){
        const index = this.likes.findIndex(cur => cur.slug === slug);
        this.likes.splice(index,1);
    }
    isLiked(slug){
        return this.likes.findIndex(cur => cur.slug === slug) !== -1;
    }
    getNumLikes(){
        return this.likes.length;
    }
}