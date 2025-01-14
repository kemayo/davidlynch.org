--- 
layout: post
title: How to generate PDFs from XML using Apache FOP in Ruby on Rails
excerpt: ""
wordpress_id: 16
wordpress_url: http://davidlynch.org/blog/2008/01/how-to-generate-pdfs-from-xml-using-apache-fop-in-ruby-on-rails/
disqus_threadid: 445428419
date: 2008-01-09 14:50:07 -06:00
tags: 
- programming
- ruby
- rails
---
The title is a bit of a mouthful. Sorry.

Before we begin, I present the caveat that this code should **not** be used on a production system. It launches a java runtime for every single request, which would cripple you. This would need (a) output caching, and (b) some sort of persistent [FOP](http://xmlgraphics.apache.org/fop/) server process before it could be considered usable.

But if you just need to generate PDFs on an intranet app, say, then this could be handy.

Step 1: Put FOP somewhere it can be found. Specifically, its "build" and "lib" folders. I created a "fop" directory in my project, and stuck everything in there. (I don't promise that this is ideologically sound -- I'm new to the whole Rails thing.)

Step 2: Add `Mime::Type.register "application/pdf", :pdf` to `config/initializers/mime_types.rb` (this gleaned from [Dynamic Graphics with Rails 1.2](http://nubyonrails.com/articles/2006/12/18/dynamic-graphics-with-rails-1-2)).

Step 3: Use a controller action something like this:
{% highlight ruby %}
# GET /documents/1
# GET /documents/1.xml
# GET /documents/1.pdf
def show
  @document = Document.find(params[:id])

  respond_to do |format|
    format.html # show.html.erb
    format.xml { render :xml => @document }
    format.pdf do
      # We generate the classpath by scanning the FOP lib directory
      command = "java -cp #{Dir.getwd}/fop/build/fop.jar"
      Dir.foreach("fop/lib") do |file|
        command << ":#{Dir.getwd}/fop/lib/#{file}" if (file.match(/.jar/))
      end
      command << " org.apache.fop.cli.Main "
      command << " -xml #{Dir.getwd}/fop/xml/#{@document.file}"
      command << " -xsl #{Dir.getwd}/fop/xslt/doc2fo.xsl"
      command << " -pdf #{Dir.getwd}/fop/tmp/#{@document.id}.pdf"
      if(Kernel.system command) then
          send_file "#{Dir.getwd}/fop/tmp/#{@document.id}.pdf",
            :type => "application/pdf"
      else
          render :text => command
      end
    end
  end
end
{% endhighlight %}

Then whenever someone asks for "documents/17.pdf" it'll make a PDF and serve it right on up. In the event that something goes wrong it'll just display the command it ran, for some rough-and-ready debugging.

For a proof-of-concept you could try this with the example XML and XSLT that comes with FOP. Look for "projectteam2fo.xsl" in the examples directory.

As I said above, this works, but should not be put anywhere near a publicly accessible site.
