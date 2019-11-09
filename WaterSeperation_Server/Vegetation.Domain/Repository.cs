using System;
using System.Linq;
using System.Linq.Expressions;
using Vegetation.DAL;
using Vegetation.DAL.DbContexts;

namespace Vegetation.Domain
{
    public class Repository<T, TKey> : IRepository<T, TKey> where T : class, IEntity<TKey>
    {

        protected VegetationDbContext DbContext;

        public Repository(VegetationDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        public T Save(T entity)
        {
            if (entity is IEntity<int> intkeyObj)
            {
                return intkeyObj.Id == 0 ? this.DbContext.Add(entity).Entity : this.DbContext.Update(entity).Entity;
            }
            else if (entity is IEntity<short> shortkeyObj)
            {
                return shortkeyObj.Id == 0 ? this.DbContext.Add(entity).Entity : this.DbContext.Update(entity).Entity;
            }
            else if (entity is IEntity<long> longkeyObj)
            {
                return longkeyObj.Id == 0 ? this.DbContext.Add(entity).Entity : this.DbContext.Update(entity).Entity;
            }
            else if (entity is IEntity<Guid> guidkeyObj)
            {
                if (guidkeyObj.Id == Guid.Empty)
                {
                    guidkeyObj.Id = Guid.NewGuid();
                    return this.DbContext.Add(entity).Entity;
                }
                else
                    return this.DbContext.Update(entity).Entity;
            }
            else
                throw new Exception();
        }

        public T Create(T entity)
        {
            return this.DbContext.Add(entity).Entity;
        }

        public void Update(T entity)
        {
            this.DbContext.Update(entity);
        }

        public void Delete(T entity)
        {
            this.DbContext.Remove(entity);
        }

        public void DeleteAll(Expression<Func<T, bool>> predicate)
        {
            this.DbContext.RemoveRange(this.DbContext.Set<T>().Where(predicate));
        }

        public IQueryable<T> Get()
        {
            return this.DbContext.Set<T>().AsQueryable();
        }

        public IQueryable<T> Get(Expression<Func<T, bool>> predicate)
        {
            return this.DbContext.Set<T>().Where(predicate);
        }

        public T Single()
        {
            return this.DbContext.Set<T>().Single();
        }

        public T Single(Expression<Func<T, bool>> predicate)
        {
            return this.DbContext.Set<T>().Where(predicate).Single();
        }

        public T SingleOrDefault()
        {
            return this.DbContext.Set<T>().SingleOrDefault();
        }

        public T SingleOrDefault(Expression<Func<T, bool>> predicate)
        {
            return this.DbContext.Set<T>().Where(predicate).SingleOrDefault();
        }

        public T First()
        {
            return this.DbContext.Set<T>().First();
        }

        public T First(Expression<Func<T, bool>> predicate)
        {
            return this.DbContext.Set<T>().Where(predicate).First();
        }

        public T FirstOrDefault()
        {
            return this.DbContext.Set<T>().FirstOrDefault();
        }

        public T FirstOrDefault(Expression<Func<T, bool>> predicate)
        {
            return this.DbContext.Set<T>().Where(predicate).FirstOrDefault();
        }
    }
}
