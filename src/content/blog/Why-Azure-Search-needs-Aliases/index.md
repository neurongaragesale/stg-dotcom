---
title: "Why Azure Search needs Aliases"
tags: [Search,Azure,Elastic,Architecture]
description: "Why this missing feature in Azure Search keeps this product from being awesome"
author: "NGS"
date: "2021-10-03"
# ###################### Metadata
ogtype: "Blog"
seotags: ["Azure Search", "Elastic Search","Search","Architecture"]
# ###################### Series Information
inseries: "false"
series: ""
seriesslug: ""
---

If you don’t know, I’m kind of a search homer and, while I love Elastic Search, I sometimes have to use other search engines. Recently, I’ve been using Azure Search in conjunction with Cognitive Services to provide a rich environment for Text Mining. While I must say I am impressed, there is one feature which the current lack of has me baffled – that’s the concept of an alias. 

Recently I posed this question on twitter, and was asked to post to a forum, 

`oembed: https://twitter.com/NeuronSale/status/1413880404218683394`

Naturally, me posting on a random forum will only get me so far – especially as there are quite a few previous Microsoft forums and user voice request for this feature. Therefore, I figured I’d write up my why in a more verbose way here.  I get a little snarky at the end because, frankly, I’m tired of watching other search engines (cough) Elastic Search (cough) always coming out on top and Microsoft, seemingly, not investing in its product the way I’m seeing it used in the field. What follows is my argument why aliases are critical for Azure Search. I could write more about how I’ve (time and time again) been forced to remove Azure Search from the running of possible search engines, but fixing aliases alone would at least close the gap. 

So, let’s begin. 

# What is an Alias 

As I’m speaking of a feature gap between Azure Search and Elastic, let’s see what Elastic says about their definition: 

*“The index aliases API allows aliasing an index with a name, with all APIs automatically converting the alias name to the actual index name. An alias can also be mapped to more than one index, and when specifying it, the alias will automatically expand to the aliased indices. An alias can also be associated with a filter that will automatically be applied when searching, and routing values. An alias cannot have the same name as an index.”*
Source:  https://www.elastic.co/guide/en/elasticsearch/reference/6.8/indices-aliases.html

Cool, here’s how I see it. 

An alias is an architectural component of a search system which provides an abstraction and (potentially) an aggregate of the source indexes. The abstraction component is crucial to providing the most decoupled architecture possible. 

Why are Aliases so important and awesome? Many reasons. All of which I’ll gladly show you now.

# Aliases decouple your consuming systems from the index itself

Whether you are calling search directly or through a proxy service, you’ll ultimately have to pin your call to a URL. Like in most search systems that expose an api, the index in question is part of that URL. The example below shows the URL to query an Azure Search index called idx-products

```
https://srch-northwindproducts.search.windows.net/indexes/idx-products
```

That’s cool and normal, but what happens when you have to change the index schema? Remember, the schema of an index is immutable – you can’t just add a field, map it, and reindex. Nope, you have to create a brand-new schema, map it in your ingestion, and do a full index. But, now you have a new index with a new index name. Since the URL includes the index name you have to modify the configuration of all systems consuming the index. In my case, that includes: 

1. Web application
2. Power BI reports using search as a source for visualizations
3. Some custom ingestion jobs sitting in Azure Functions
4. Probably some other stuff I’ve either forgotten about or someone else setup and never documented

That’s a lot of changes for a simple field. You may be saying to yourself, “but the underlying data model changed.. so of course you need to get the owners of consuming apps involved. Cool, but that’s not always the case; especially when you deal with cognitive services. 

Remember how I said the integration between cognitive services and search are tight in Azure? Here’s an example. Using the custom entity lookup in a search skill I can easily create custom entity models and present them in search results as refiners. However, like all entity recognition models, you sometimes end up tweaking your model. Whenever you do this, you have to do a full re-index. Imagine being asked to change an existing lookup model and putting it in production, all without taking down the index being used in production. With Azure search, I’m still limited by the connection information in the consuming apps. This has literally made me sad recently.

But it’s not just that. I’ve seen situations where data (for whatever reason) doesn’t have a good modified date. So, to keep the index up to date with the source system, a full re-index is needed every night. 

How this is solved with Aliases?

Simply put, aliases take the responsibility of pointing to the right index away from consumers. If it helps, think about it like a DNS entry vs hostname or IP. Look at the image below for a visualization. 

![Example showing the difference between using an alias and not](.\AliasAbstractionEx.png)



# Aliases provide for better presentation of heterogeneous data and transindex data

Let’s start with heterogeneous. I LOVE heterogeneous data and have built a few pretty sweet heterogeneous data systems still in use today. Whether it be simply varying product types, or completely different types of data, presenting them together as great value to users. However, to do it right, you need aliases. Here is a basic example to explain why. 

Let’s say you run a store which sells comic books and trading cards. I want my web site to provide a unified search experience so when a user search for Wolverine they get back both comics and trading cards featuring Wolverine. I’ll provide a type refiner so users can drill down. The data objects for comics and cards are different and so are the source systems. To do this, I have two options

**Option 1 – genericize into a single index**

To do this, you would take the available fields from both data sources, push similar fields into a single search index field, and for those specifically unique in a data source, just add them too – knowing they’ll always be null for the data source it’s not found in. As you can see in the image below, my unified schema has a bunch of fields that will only have information in one source or another (i.e. DiamondId for comics, CardNumber for cards) and I’ve genericized comic cover variants and card parallels into a single field. 

![Example of a unified schema for comics and trading cards](.\unifiedschema.png)



**Option 2 – Create separate schemas** 

To do this, you take each of your data sources (comics & cards) and build out their own schemas. If there are common fields (such as SearchDescription and price) just make sure their names are the same. Look at the image below. You’ll see there are no generic fields, and each index is closely resembling the source system. 

![Example showing a comic index and trading card index merged together by an alias](.\multiindex.png)

**Let’s review these options**

Option 1 has, IMHO, the following problems:

1. I have to create unnatural data mappings when loading data. If I chose to merge data from both types into a single field such as Card Number, I genericize it in a way which is unnatural (comic book issue number is always a number, Card Number is not) 
2. I have a ton of fields which will always be null from one of my data sources
3. I’ll have a ton of fields in my index (remember the max fields on an index isn’t configurable in Azure Search like it is in Elastic) 
4. It makes scaling into new products more difficult from an architecture perspective – want to add funko pops to your product line? Got to rebuild the index from scratch after adding some specific funko fields… doesn’t that sound fun? 

Option 2 is much easier

1. My indexes field number is small (this could be a big deal for you as Azure Field limits aren’t configurable as of the time of writing) 
2. Nullness actually means something as each product is in an index with fields specific to its type
3. Scaling new products is easy. Want funko pops? Create your schema with the Common Schema fields included, load your products, wait for those slow front end devs to finish updates, then add the index to the alias… easy peasy lemon squeezy

![Example of option 2 with expansion for funko pop](.\FunkoExpansion.png)

However, in order to get option 2 to work, and merge multiple index results into the same result set, you must have an alias. 

How about transindex data?

Search isn’t always about products. It’s also for analytics. Analytics usually means large amounts of data which you may breakdown into separate indexes (say by day), but want to query them together.  I’ll keep this short. It’s impossible within Azure Search. However, with aliases, you can not only do it, but programmatically keep only the last X days of indexes in the set. 



# Aliases allow for tailored experiences with less indexes

So let’s say you work for Acme Widgets Co. You have an internal application which uses search to present widgets, the bill of materials for each widget class, and parts with availability for widgets. Management has asked you to provide just parts and availability data to a new mobile app being developed for retail users to easily check if parts are in stock before going to the store. 

Network and security considerations aside, this is easily achieved with aliases in your search architecture. 

If you’ve broken down your components into individual indexes with aliases on top of them, you only have to create a new alias for the new app, and point it only to the Parts index. You can even provide a filter to the alias so it only pulls parts which meet a certain criteria. 

Without aliases it’ll require you to either spin up a second index just for your mobile parts app, or force the mobile app to always query with a filter for only parts (and possibly exposing your internal only bill of materials to the world). 

![Diagram showing how an alias architecture can provide extra usage to an existing index](.\multiappalias.png)



# Why should Microsoft implement this feature? 

I think I’ve spent enough time showing why aliases are awesome, so why should Microsoft implement them?

## Elastic Search has it

Not saying you should do everything Elastic does, but their core reason for aliases was (I assume) the removal of mapping types (read about that here: https://www.elastic.co/guide/en/elasticsearch/reference/current/removal-of-types.html)

## You literally did this and know how to do it before

Remember content sources and result types in SharePoint 2013 and beyond? Yeah, that was a very rudimentary implementation on both the backend and frontend. 

## You aren’t as competitive as you should be without it

There are so many times I have to be like, “oh let’s talk about Elastic Search” and completely ignore Azure Search from the conversation because of this feature not existing in Azure. Azure’s indexers, skill sets, ability to hook up to storage accounts, and connect to Cognitive Services is freaking awesome. However, the lack of aliases and the complexity of some of the data I deal with means I just keep on skipping over Azure Search and that makes me sad. 

At this point, I’ve probably beaten this topic to death. But I did so because I think it’s so important to Azure Search’s future. 

Questions or Comments? Ping me. 