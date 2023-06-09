'use client';

import dynamic from 'next/dynamic';

import Button from '../Button';
import ImageUpload from '../ImageUpload';
import Input from '../Input';

import { useDeleteProject } from '@/hooks/useDeleteProject';
import { useUpdateProject } from '@/hooks/useUpdateProject';
import { Project } from '@/interfaces';

const DeleteProjectModal = dynamic(() => import('../DeleteProjectModal'), {
  ssr: false
});

const UpdateProjectForm = ({ project }: { project: Project }) => {
  const {
    register,
    handleSubmit,
    setCustomValue,
    onSubmit,
    isSubmitting,
    errors,
    thumbnail
  } = useUpdateProject(project);

  const { isOpen, setIsOpen } = useDeleteProject();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-white font-bold">Update Project</h1>
        <div className="flex flex-col md:flex-row mt-4 w-full gap-4">
          <Input
            label="Title"
            {...register('title')}
            error={errors.title?.message}
            white
          />
          <Input label="Type" {...register('type')} white />
        </div>
        <div className="flex flex-col md:flex-row mt-4 gap-4">
          <Input label="Slug" {...register('slug')} white />
          <Input
            label="Link Website"
            {...register('linkWebsite')}
            error={errors.linkWebsite?.message}
            white
          />
          <Input
            label="Link Repository"
            {...register('linkRepository')}
            error={errors.linkRepository?.message}
            white
          />
        </div>
        <div className="mt-4">
          <ImageUpload
            onChange={(value) => setCustomValue('thumbnail', value)}
            value={thumbnail as string}
          />
        </div>
        <div className="mt-4 relative bg-button-gradient p-[0.15rem] rounded-xl">
          <textarea
            {...register('description')}
            className={`resize-none block px-3 pt-6 pb-1 w-full h-24 text-md text-white bg-zinc-800 rounded-xl appearance-none focus:outline-none focus:ring-0 peer transition`}
            placeholder=" "
          />
          <label
            htmlFor=""
            className="absolute flex gap-2 text-md text-white duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
          >
            Description
          </label>
        </div>
        <div className="mt-4 flex flex-col md:flex-row gap-4 items-center">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />{' '}
                Updating...
              </>
            ) : (
              'Update'
            )}
          </Button>
          <Button type="button" onClick={() => setIsOpen(true)}>
            Delete
          </Button>
        </div>
      </form>
      {isOpen && (
        <DeleteProjectModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          projectId={project.id}
        />
      )}
    </>
  );
};

export default UpdateProjectForm;
